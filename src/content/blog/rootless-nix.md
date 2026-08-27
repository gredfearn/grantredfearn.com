---
layout: blog
title: The Secure Container 
date: 2026-08-27
excerpt: Building Secure OCI Images 
---

Today I would like to share some personal experience with building secure OCI
images. A common root escalation path involves exploiting an application to gain
access root, and then use a package manager (or even cURL) to install malware,
exfiltrate data, expose database credentials, and more. One of the ways to
prevent such actions is to:

1.  not run your applications as root and
2.  prevent additional packages from being installed

I kept a couple tools in my pocket for such an occasion that have served me well
in building secure containers using [Nix](https://nixos.org/)


# Managing Root User:

The acceptance criteria is:

-   Drop root after startup
-   Run app with minimal OS privileges

We have a few popular options here that can satisfy most of this:

-   [gosu](https://github.com/tianon/gosu)
-   [su-exec](https://github.com/ncopa/su-exec)
-   [setpriv](https://man7.org/linux/man-pages/man1/setpriv.1.html) - part of `util-linux`
   
If you want to using something more well known, slap the linux utility `setpriv` in your Dockerfile:
        
        exec setpriv \
            --reuid=1000 \
            --regid=1000 \
            --clear-groups my-app-binary

There is also a Nix native way i'll toss into the image build code example in a sec.

# Nix Security Properties:

I would like to keep the Nix stuff pretty high level, because I didn't intend on
making a Nix tutorial today. Instead I will focus on the innerworkings that make
these types of containers secure. With this in mind, lets talk about

### Nix Store and Nix Build

Installing Nix will create unprivileged build users (32 of them that are labeled
   `nixbld1` through `nixbld32`) that manage the nix store, located at
   `/nix/store`. Every package that Nix installs lands in the Nix store like
   `/nix/store/<hash>-package`. This is immutable, and content-addressed; the
   package&rsquo;s unique identifier and storage path are derived directly from
   the final compiled files. There is no global mutable state; `/usr/bin` and
   `/lib` are untouched.

When using Nix as your image builder, your resulting image is
   ultra-lightweight, as it starts as an empty OCI container with absolutely
   nothing and only injects your declarative package list derivations and
   environment files you explicitly provide.

Check out this head to head with `ubuntu-slim`:

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<tbody>
<tr>
<td class="org-left">Feature |</td>
<td class="org-left">Ubuntu Slim |</td>
<td class="org-left">Nix <code>buildImage</code></td>
</tr>

<tr>
<td class="org-left">Package Manager</td>
<td class="org-left">Contains <code>apt</code> and <code>dpkg</code></td>
<td class="org-left">None. Nix is used to build, but isn&rsquo;t shipped.</td>
</tr>

<tr>
<td class="org-left">Shell Access</td>
<td class="org-left">Contains <code>/bin/bash</code> or <code>/bin/sh</code></td>
<td class="org-left">None unless you explicitly add <code>pkgs.bash</code></td>
</tr>

<tr>
<td class="org-left">Base Utilities</td>
<td class="org-left">Ships with <code>ls</code>, <code>grep</code>, <code>mkdir</code>, etc.</td>
<td class="org-left">None unless you explicitly install <code>pkgs.coreutils</code></td>
</tr>

<tr>
<td class="org-left">Dead Weight</td>
<td class="org-left">Heaps of libraries in the scrapyard waiting to be abused.</td>
<td class="org-left">Zero.</td>
</tr>
</tbody>
</table>

To break the Nix portion down:

-   Immutable build dependencies that can easily be reproduced by referencing
    `<hash>-package`. same hash = same bits, tamper-evident.
-   Exact dependency closure; nothing extra, no shared libs that could be swapped.
-   Tiny image with zero fluff.

Minimal container example with Nix:

    # default.nix
    { pkgs ? import <nixpkgs> {} }:
   
    pkgs.dockerTools.buildImage {
      name = "myapp";
      contents = [
        pkgs.gosu
        pkgs.myapp
        # nothing else — no shell, no curl, no package manager
      ];
      config = {
        # standard docker entrypoint style which calls gosu
        Entrypoint = [ "/bin/entrypoint.sh" ];
   
        # Nix native, non-root. No entrypoint or gosu required
        Cmd = [ "${pkgs.my-app}/bin/my-app" ];
        # runs immediately as non-root, no gosu/su-exec/setpriv required
        User = "1000:1000";
      };
    }

NOTE: this assumes that you have wrapped your application by creating a Nix
derivation for your `myapp` package. You can download all of
(nixpkgs)[<https://github.com/nixos/nixpkgs>] repo and see how every single
official Nix derivation is built, and garuntee you can find some goodness in
there to yoink.


# Combined pattern:

Lets check out the build + runtime setup, and see what we bought:


## Build time (Nix):

\> installs exact closure to `/nix/store` (read-only, hashed)

\> no `apt/yum/pip` left in image to install malicious packages later

## Runtime (drop the root):

\> unless you are Nix and start as non-root, `gosu` (or other) drops to non-root

\> app runs, can READ `/nix/store` but cannot modify it


# Closeout

Thinking back to the start about our attacker exploiting the app and snaking all
the things, when using non-root with Nix:

exploit app > appuser:

\> can't write /nix/store (immutable + wrong owner)

\> no package manager to abuse

\> can't escalate (no setuid bins in nix store by default)

\> blast radius contained to appuser's dirs only

\> doesn't even own a shell

No shell in the image = attacker can't run arbitrary commands even if they
get in. Is this another pitch for anyone reading this to use Nix? probably.
But its a pretty compelling one.



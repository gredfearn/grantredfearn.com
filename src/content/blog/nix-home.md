---
layout: blog
title: NixOS Ended My Dotfile Chaos
date: 2026-05-21
excerpt: After years of manually syncing dotfiles across machines and maintaining complicated bash scripts/brewfiles/bespoke configurations, I rebuilt my entire development environment using NixOS and Nix flakes. Here's what I learned and how you can replicate this setup.
---

After years of manually syncing dotfiles across machines and maintaining
complicated bash scripts/brewfiles/bespoke configurations, I rebuilt my entire
development environment using NixOS and Nix flakes. Here's what I learned and
how you can replicate this setup.

## The Problem with My Old Dotfiles

Relying on an init setup script that gets run exactly once when configuring a
new machine was always fragile. There was always a brittle piece; maybe a
dependency changed names or was no longer available via Homebrew, or maybe the
order of operations needed to be adjusted to account for new requirements.
Regardless, the script served as a starting point, but never the end of my
configuration woes. Additionally, I had limited control over the software
versions and would often have to adjust to new packages that haven't been tested
together.

Enter Nix! My dotfiles don't just configure my applications and dev environment,
they also specify exactly which versions to install and how to configure them.
- https://github.com/gredfearn/dotfiles

## Two Directories, Two Concerns

I split my configuration into two directories:
- System-level configuration (symlinked to /etc/nixos)
```
nixos/ 
- Core flake.nix with multiple nixpkgs channels
- Hardware, bootloader, and networking setup
- System services and user accounts
```
- User-level dotfiles (symlinked to $HOME)
```
home/ 
- Shell configurations and aliases
- Application settings (Git, tmux, Doom Emacs)
- Personal scripts and utilities
```

I chose to keep system-level configs isolated because sometimes I just want to
port my bash aliases around, or otherwise use some of this config on other
non-NixOS machines. Admittedly, I haven’t fully transitioned to using Nix to
generate these files yet.

## Multi-Channel Strategy with Flakes

By combining stable, unstable, and previous nixpkgs channels in a single flake:
```
inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.12";
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixos-unstable";
    nixpkgs-previous.url = "github:NixOS/nixpkgs/nixos-23.11";
    home-manager.url = "github:nix-community/home-manager";
};
```

I get:
- Stable packages for core system components
- Ability to pull bleeding-edge versions of tools from unstable
- Pin broken deps to an older version if newer versions aren't compatible

This is what having control over your environment’s dependency versions looks
like. Before converting to NixOS, I was constantly wrestling with Arch and
bleeding-edge package compatibility issues that slowed my development process.
If something was broken, had to fix it then and there before moving on. Since
Nix keeps a history of configuration revisions, it’s easy to roll back to the
last working configuration and continue working until I have the bandwidth to
address issues properly.

In addition, I am able to keep my local dependencies aligned with the Nix
package versions used by our repositories. This eliminated the vast majority of
the "works on my machine" issues because I can guaruntee local, project, and
deployed application dependancies are all using the same versions.

## Modular Home Manager Configuration

My Home Manager setup uses a modular approach with platform-specific includes:
```
home-manager/
├── base.nix           # Core config for all platforms
├── linux.nix          # Linux-specific tools
├── gnome.nix          # GNOME desktop settings
├── kde.nix            # KDE Plasma configuration
├── sway.nix           # Sway window manager
└── not-aarch64.nix    # x86_64-only packages
```

The flake.nix includes a `combineHomeManagerModules` function that conditionally
composes these modules based on the target system. This means my Framework
laptop gets the full GNOME setup, while my M1 MacBook skips x86-only packages
automatically.

## Custom Derivations for Proprietary Software

Despite best community effort, not everything is available in nixpkgs. I
maintain custom Nix derivations for:
- CrowdStrike Falcon Sensor - Security agent required by my employer
- Secureframe Agent - Compliance monitoring tool, also required by my job
- Cider - Apple Music client for Linux

These live in the nixos/ directory as custom derivations and can be referenced
just like any other package in the config.

## Doom Emacs Integration

If I didn't do it for my IDE, what did I do it for? You could argue that's where
this all started; once you go down the route of programming your IDE, you
develop a certain dependency on the shortcuts and functionality it provides. To
be fair, Doom Emacs has a lot of what I want out of the box; VIM bindings, modal
editor, and a dialect of lisp that allows me to extend functionality. The
majority of my additional configuration is adding Language Server Support for
syntax helpers.
  
My Doom Emacs configuration (home/.doom.d/) is version-controlled alongside everything else.

The setup includes:
- Custom modules and packages 
- Consistent configuration across all machines

## Unlocking the Full Potential 
- Disaster Recovery: My laptop died last month. I bought a new one, booted from a USB stick, ran nixos-install, and had my exact
environment back in 30 minutes. 
- Experimentation: Want to try a new window manager? Add sway.nix to your imports. Don't like it? Remove the line and rebuild. No
leftover packages or configs. 
- Onboarding: New team members can replicate my development environment exactly, ensuring everyone has the same tool versions.

## Adopting this Approach 

You could be like me and do everything all at once, Home Manager, Flakes, NixOS,
and converting all your configs. I was fortunate enough to have work
experience with Nix already, which allowed me to whole-hog my configuration
without too much trouble. However, jumping into a setup like this may be a bit
intimidating. Home Manager works with any operating system, which would give
you the power to control your versions, so if this all sounds scary I would start there!

If you want to adopt this approach:
1. Start small: Learn Nix language basics and begin with Home Manager on your existing OS
2. Build gradually: Add packages one at a time to your configuration
3. Use flakes from day one: Don't bother with channels, you'll want flakes eventually anyway
4. Commit frequently: Your Git history becomes your config changelog and the state of your operating system.
5. Steal ideas from my [dotfiles](https://github.com/gredfearn/dotfiles)
6. Steal ideas from other peoples Nix dotfiles. 

## Lessons Learned

Embrace the learning curve. Nix has unfamiliar concepts (derivations, overlays,
flakes), but the payoff is worth it for all the boons we discussed.

Document your custom derivations. Future you will forget why that weird patch was necessary.

Download the [nixpkgs repository](https://github.com/NixOS/nixpkgs) locally, and
read how people write derivations for packages. Documentation for Nix is
notoriously all over the place and there is nothing like a concrete working
example to borrow from.

Thank you for your time, I hope this serves you well. Cheers!

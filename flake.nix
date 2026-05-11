{
  description = "Development environment for grantredfearn.com";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            terraform
            awscli2
          ];

          shellHook = ''
            echo "Development environment loaded"
            echo "Terraform version: $(terraform version | head -n1)"
            echo "AWS CLI version: $(aws --version)"
          '';
        };
      }
    );
}

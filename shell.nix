{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_20  # Use LTS version (20.x)
    pnpm
  ];

  shellHook = ''
    echo "Node.js ${pkgs.nodejs_20.version} (LTS) environment loaded"
    echo "Compatible with SvelteKit requirements"
    export PATH="$PWD/node_modules/.bin:$PATH"
  '';
}

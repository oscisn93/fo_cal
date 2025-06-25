{ pkgs, lib, config, inputs, ... }:

{
  packages = [ pkgs.git ];
  
  languages.typescript.enable = true;
  
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs-slim;
    npm.enable = true;
  };

  languages.python = {
    enable = true;
    package = pkgs.python312;
    directory = "./server";
    uv.enable = true;
    venv = {
      enable = true;
      requirements = ''
        black
        convex
        python-dotenv
        fastapi[all]
      '';
    };
  };

  # scripts.hello.exec = ''
  #   echo hello from $GREET
  # '';

  # enterShell = ''
  #   hello
  #   git --version
  # '';
}

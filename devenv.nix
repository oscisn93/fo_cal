{ pkgs, lib, config, inputs, ... }:

{
  packages = [ pkgs.sqlite pkgs.turso-cli pkgs.sqlfluff ];
  
  languages.typescript.enable = true;
  
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs-slim;
    npm.enable = true;
  };

  # default port 6379
  services.redis.enable = true;

languages.python = {
    enable = true;
    package = pkgs.python312;
    directory = "./server";
    uv.enable = true;
    venv = {
      enable = true;
      requirements = ''
        black
        python-dotenv
        libsql
        redis[hiredis]
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

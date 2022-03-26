log("© 2022 by Nexis Inc. Type 'cpright' for more information.");
log("Welcome to The Terminal. Type 'help' for help.");

register_cmd("calc", function(cmd) {
    openWin("Calculator","calc","300px","450px");
    log("Opened the calculator.");
});
function smart_split(input, del, empty_space) {
    if (input.length === 0) return input;
    var outputs = [""];

    var compare = function(base, insert, position) {
        if ((position + insert.length) > base.length) return false;
        for (var i = 0; i < insert.length; i++) {
            if (!(base.charAt(position + i) === insert.charAt(i))) return false;
        }
        return true;
    };

    var quotes = false;
    for (var i = 0; i < input.length; i++) {
        var char = input.charAt(i);
        if (char === '"') {
            quotes = !quotes;
            continue;
        }

        if (!quotes && compare(input, del, i)) {
            outputs.push("");
            i += del.length - 1;
            continue;
        }

        outputs[outputs.length - 1] += char;
    }

    if (!empty_space) {
        for (var i = 0; i < outputs.length; i++) {
            if (outputs[i] === "") {
                outputs.splice(i, 1);
            }
        }
    }

    return outputs;
}

var terminal_user_title = "C:/usr/guest ";

function update_user_title(title) {
    terminal_user_title = title;
    document.getElementById("input_title").innerText = terminal_user_title + " > ";
}

update_user_title(terminal_user_title);

var current_block;

function new_block() {
    var wrapper = document.getElementById('wrapper');
    current_block = document.createElement("div");
    current_block.classList.add("log");
    wrapper.appendChild(current_block);
}

function block_log(message) {
    current_block.innerHTML += "<p>" + message + "</p>";
}

function log(message) {
    var wrapper = document.getElementById('wrapper');
    wrapper.innerHTML += "<div class='log'><p>" + message + "</p></div>";
}

document.getElementById('input_source').onblur = function() {
    document.getElementById("input_source").focus();
};

document.getElementById('input_source').addEventListener('keyup', submit_command);

var registry = new Map();

function register_cmd(cmd_name, func) {
    registry.set(cmd_name.toString().toUpperCase(), func);
}

function submit_command() {
    event.preventDefault();
    if (!(event.keyCode === 13)) return;
    var command = document.getElementById("input_source").value;
    document.getElementById("input_source").value = "";
    if (command !== "") {
        new_block();
        block_log(terminal_user_title + " > " + command);

        if (registry.has(command.split(" ")[0].toUpperCase())) {
            registry.get(command.split(" ")[0].toUpperCase())(command);
        } else {
            block_log("'" + command.split(" ")[0].toUpperCase() + "' is not a valid command, please provide an existing command.");
        }
    }
}

register_cmd("help", function(cmd) {
    var parameters = smart_split(cmd, " ", false).slice(1);
    console.log(parameters);
    if (parameters.length === 0) {
        block_log("┌─ Help ─────────────┐");
        block_log("│- help&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp│");
        block_log("│- calc&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp│");
        block_log("│ There are secrets! │");
        block_log("└────────────────────┘");
        return;
    }

    if (parameters[0].toString().toUpperCase() === "HELP") {
        if (parameters.length === 1) {
            block_log("┌─ help ─────────────────┐");
            block_log("│ Usage: help &lt;command&gt; &nbsp│");
            block_log("│ Gets information about │");
            block_log("│ the specified command. │");
            block_log("└────────────────────────┘");
            return;
        }
    } else if (parameters[0].toString().toUpperCase() === "CALC") {
        if (parameters.length === 1) {
            block_log("┌─ calc ───────────────┐");
            block_log("│ Usage: calc &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp│");
            block_log("│ Opens the calculator │");
            block_log("│ window. &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp│");
            block_log("└──────────────────────┘");
            return;
        }
    } else if (parameters[0].toString().toUpperCase() === "CPRIGHT") {
        if (parameters.length === 1) {
            block_log("┌─ cpright ─────────────┐");
            block_log("│ Usage: cpright (more) │");
            block_log("│ Outputs the copyright │");
            block_log("│ notice. &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp│");
            block_log("└───────────────────────┘");
            return;
        }
    } else {
        block_log("'"+parameters[0].toString()+"' is not a valid command, please provide an existing command.");
    }
});

register_cmd("cpright",function(cmd) {
    var parameters = smart_split(cmd, " ", false).slice(1);
    console.log(parameters);
    if (parameters.length === 0) {
        block_log("© Copyright information:");
        block_log(" - Most of this webpage was made by Nexis.");
        block_log(" - There were some dependencies used, like:");
        block_log(" &nbsp&nbsp· Winbox.js by Nextapps");
        block_log(" &nbsp&nbsp· UiTerminal by omerimzali");
        block_log(" Thank you for your cooperation.");
        block_log(" Type 'cpright more' for the copyright notice.");
        return;
    }
    if (parameters[0].toString().toUpperCase() === "MORE") {
        if (parameters.length === 1) {
            log("Yo! You found the secret. This thing isn't copyrighted yet!!!");
            return;
        }
    } else {
        block_log("'"+parameters[0].toString()+"' is not a part of this command. Please provide a valid paramenter.");
    }
});
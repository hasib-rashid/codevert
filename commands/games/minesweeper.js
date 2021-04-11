const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "minesweeper",
            aliases: [],
            group: "games",
            memberName: "minesweeper",
            description: "Play a game of Minesweeper",
            details: oneLine`
            Play a game of Minesweeper
            `,
            examples: ["!minesweeper"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        const { channel } = message;
        const args = message.content.split(" ").slice(1);

        let mines;
        let width;
        let height;

        let diff = "beginner";
        if (args[0]) {
            diff = args[0].toString().toLowerCase();
            switch (args[0].toString().toLowerCase()) {
                case "intermediate":
                    mines = 22;
                    width = 12;
                    height = 12;
                    break;
                case "advanced":
                    mines = 40;
                    width = 14;
                    height = 14;
                    break;
                case "custom":
                    console.log(`Time for a custom game! Args: ${args}`);
                    mines = parseInt(args[1]) || 9;
                    width = parseInt(args[2]) || 10;
                    height = parseInt(args[3]) || 10;
                    break;
                case "beginner":
                    mines = 10;
                    width = 9;
                    height = 9;
                    break;
                default:
                    return Error(
                        `**Wait, ${args[0]
                            .toString()
                            .toLowerCase()} isn't a difficulty!**`
                    );
            }
        } else {
            mines = 10;
            width = 9;
            height = 9;
        }

        const hide = true;
        const hint = true;

        if (mines >= width * height) {
            return Error(
                `There are too many mines! (${mines} mines, but ${
                    width * height - 1
                } max)`
            );
        }

        const field = new Array(height)
            .fill(0)
            .map(() => new Array(width).fill(0));

        let i = 0;
        while (i < mines) {
            const rnW = Math.trunc(Math.random() * width);
            const rnH = Math.trunc(Math.random() * height);
            if (field[rnW][rnH] == 0) {
                field[rnW][rnH] = 100;
                i++;
            }
        }

        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                around(j, i, width, height, field);
            }
        }

        let output = "";
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                output += `${field[i][j]}\t`;
            }
            output += "\n";
        }

        let h;
        let placedHint;

        if (hide) {
            h = "||";
            placedHint = false;
        } else {
            h = "";
        }

        output = output.replace(/10\S/g, `${h}:boom:${h}`);

        const emojis = {
            0: ":zero:",
            1: ":one:",
            2: ":two:",
            3: ":three:",
            4: ":four:",
            5: ":five:",
            6: ":six:",
            7: ":seven:",
            8: ":eight:",
        };

        for (let i = 0; i <= 8; i++) {
            if (i == 0 && hide && placedHint == false && diff == "beginner") {
                h = "";
                placedHint = true;
            }
            output = output.replace(
                new RegExp(`${i.toString()}`, "g"),
                h + emojis[i] + h
            );
            if (hide && placedHint == true) {
                h = "||";
            }
        }

        output = output.replace(/\t/g, "");
        output = `**Minesweeper** :: ${diff} difficulty\n${output}`;
        if (output.length >= 2000) {
            new Error(
                `The message is too long! (It's using ${output.length} out of 2000 characters.)`
            );
        }

        channel.send(output);

        function around(x, y, w, h, f) {
            const a = x > 0;
            const b = x < w - 1;
            const c = y > 0;
            const d = y < h - 1;

            const e = [x, y];

            if (a && c) {
                check(f[x - 1][y - 1], e, f);
            }
            if (a) {
                check(f[x - 1][y], e, f);
            }
            if (a && d) {
                check(f[x - 1][y + 1], e, f);
            }
            if (b && c) {
                check(f[x + 1][y - 1], e, f);
            }
            if (b) {
                check(f[x + 1][y], e, f);
            }
            if (b && d) {
                check(f[x + 1][y + 1], e, f);
            }
            if (c) {
                check(f[x][y - 1], e, f);
            }
            if (d) {
                check(f[x][y + 1], e, f);
            }
        }

        function check(g, e, f) {
            if (g > 99) {
                // If there's a mine, it's 100 or more
                f[e[0]][e[1]]++;
            }
        }
    }
};

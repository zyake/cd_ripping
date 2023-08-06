/*
   Add metadata into MP3 files and rename them.
   - arg1: CD alubm
   - arg2: CD artist
   - arg3: title list file name
   - arg4: mp3 directory
*/

const path = require("path");
const fs = require("fs");
const childProcess = require("child_process");

const album = process.argv[2];
const artist = process.argv[3];
const titleFileName = process.argv[4];
const mp3DiretoryName = process.argv[5];

(async () => {
    // read MP3 file names
    const directoryPath = path.join(__dirname, mp3DiretoryName);
    const mp3Files = fs.readdirSync(directoryPath);
    await mp3Files.sort();
    console.log("sorted: " + mp3Files);

    // read titles
    const titlePath = path.join(__dirname, titleFileName);
    var titleIndex = 0;
    const allFileContents = fs.readFileSync(titlePath, "utf-8");
    allFileContents.split(/\r?\n/).forEach(title =>  {
        const mp3File = mp3Files[titleIndex++];
        if (!mp3File.endsWith(".mp3")) {
            console.log("skipping...:" + mp3File);
            return;
        }

        const id3toolCommand = `id3tool -a ${album} -r ${artist} -t ${title} ${mp3DiretoryName}/${mp3File}`;
        console.log("executing a command...: " + id3toolCommand);
        const execStdout = childProcess.execSync(id3toolCommand);
        console.log("exec stdout:" + execStdout);

        const mp3BeforeRenameFilePath = path.join(__dirname, mp3DiretoryName, mp3File);
        const mp3AfterRenameFilePath = path.join(__dirname, mp3DiretoryName, title + ".mp3");
        fs.renameSync(mp3BeforeRenameFilePath, mp3AfterRenameFilePath);
    });

})();

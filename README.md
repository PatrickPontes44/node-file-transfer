# node-file-transfer
This is my first node project. It's a way to transfer files between your devices, like a smartphone and a computer.

## How it works:
It creates a server in your machine that will be responsible for serving and receiving the files.<br>
From your smartphone or other device you can download and upload files directly to your computer.<br>
To begin using it you must open your browser in localhost:5000 or any port that you may come to define.

### Basic commands:
Clicking on a folder will open it. Clicking on a file will download it.<br>
Clicking the upload button will open a pop-up that allows you to choose the file you want to upload.<br>

In the text input in the main page you can type the following commands. You can define more if you want.

```bash
./
```
Returns one directory back.

```bash
../
```
Returns to root directory (the one that contains the project).

```bash
new -> some-path/some-folder/
```

Goes to the selected directory.



## License
[MIT](https://choosealicense.com/licenses/mit/)
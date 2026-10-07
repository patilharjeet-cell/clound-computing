let files = [];

function uploadFile() {

    const fileInput = document.getElementById("fileInput");
    const message = document.getElementById("message");

    if (fileInput.files.length === 0) {
        message.innerHTML = "Please select a file.";
        return;
    }

    const file = fileInput.files[0];

    const fileData = {
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type || "Unknown"
    };

    files.push(fileData);

    displayFiles();

    message.innerHTML = "File uploaded successfully!";

    fileInput.value = "";
}


function formatFileSize(bytes) {

    if (bytes === 0) {
        return "0 Bytes";
    }

    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];

    const i = Math.floor(
        Math.log(bytes) / Math.log(1024)
    );

    return (
        (bytes / Math.pow(1024, i)).toFixed(2)
        + " "
        + units[i]
    );
}


function displayFiles() {

    const fileList = document.getElementById("fileList");

    fileList.innerHTML = "";

    files.forEach((file, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>📄 ${file.name}</td>
            <td>${file.size}</td>
            <td>${file.type}</td>
            <td>
                <button
                    class="delete-btn"
                    onclick="deleteFile(${index})">
                    Delete
                </button>
            </td>
        `;

        fileList.appendChild(row);
    });
}


function deleteFile(index) {

    files.splice(index, 1);

    displayFiles();
}


function searchFiles() {

    const searchText =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const rows =
        document.getElementById("fileList")
        .getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        const fileName =
            rows[i]
            .getElementsByTagName("td")[0]
            .textContent
            .toLowerCase();

        if (fileName.includes(searchText)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}
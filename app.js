function searchPhotos() {
    const query = document.getElementById('searchQuery').value.trim();
    const resultDiv = document.getElementById('searchResults');

    if (!query) {
        resultDiv.innerHTML = 'Please enter a search term.';
        return;
    }

    resultDiv.innerHTML = '';  
    
    const apigClient = apigClientFactory.newClient({
        apiKey: ""
});

    const params = {
        q: query  
    };

    apigClient.searchGet(params, {}, {})
        .then(function(response) {
            console.log(response);
            const photosJSON = JSON.parse(response.data.body)
            const photos =  photosJSON.imagePaths
            if (photos && photos.length > 0) {
                photos.forEach(photo => {
                    const imgElement = document.createElement('img');
                    imgElement.src = photo;
                    imgElement.style.width = '100px';
                    resultDiv.appendChild(imgElement);
                });
            } else {
                resultDiv.innerHTML = 'No photos found.';
            }
        }).catch(function(error) {
            console.error('Search failed:', error);
            resultDiv.innerHTML = 'Search failed. See console for details.';
        });
}

function uploadPhoto() {
    const photoInput = document.getElementById('photoUpload');
    const labelInput = document.getElementById('customLabels');

    const photoFile = photoInput.files[0];
    const customLabels = labelInput.value;
    console.log("custom labels")
    console.log(customLabels)

    const headers = {
        'Content-Type': 'image/jpeg',
        'x-amz-meta-customLabels': customLabels,
        'x-api-key': 'Gm2zxNL4yA1QJufIJSBfu4StHWqP2kmZ14nzR327'
    };
    let config = {headers: headers}

    console.log("Photo File");
    console.log(photoFile);
    const bucketName = 'photo-bucket-meghna';
    url = `https://6g8rx04u9d.execute-api.us-east-1.amazonaws.com/dev/upload/${photoFile.name}`
    console.log(url)

    axios.put(url,photoFile,config).then(response => {
        alert("Upload successful!");
        photoInput.value = '';
        labelInput.value = '';
    })
    .catch(error => {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
      });
}
import React, { useState, useEffect } from 'react';
//DOWNLOAD
import axios from 'axios';
import fileDownload from 'js-file-download';
//AWS-AMPLIFY
import { Storage } from 'aws-amplify';


function App() {
    const [ files, setFiles ] = useState([]);


    async function fetchFiles() {
        let fileKeys = await Storage.list("");

        imageKeys = await Promise.all(fileKeys.map(async k => {
            const url = await Storage.get(k.key);
            return url;
        }));

        console.log('filesKeys: ', filesKeys);

        setFiles(filesKeys);
    }


    async function onChange(e) {
        const file = e.target.files[0];

        const result = await Storage.put(file.name, file, {
            contentType: file.type
        });

        console.log({ result });

        fetchImages();
    }


    useEffect(() => {
        fetchFiles();
    }, []);


    return (
        <>
            {
                files.map((url) => (
                    <div key={url}>
                        <img
                            src={url}
                            style={{ width: 500, height: 300 }}
                        />

                        <button
                            onClick={() => {
                                axios.get(url, {
                                    responseType: 'blob',
                                })
                                .then((res) => {
                                    fileDownload(res.data, "sample")
                                });
                            }}
                        >
                            Download
                        </button>
                    </div>
                ))
            }

            <input
                type="file"
                onChange={onChange}
            />
        </>
    )
}

export default App;
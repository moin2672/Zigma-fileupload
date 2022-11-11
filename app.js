// reference:: https://www.youtube.com/watch?v=1y0-IfRW114&t=1s

const {google} = require('googleapis')

const path = require('path')
const fs = require('fs')

const CLIENT_ID='406144852518-rn20q8302fvaupb48eo1hu8m5mnic42f.apps.googleusercontent.com'
const CLIENT_SECRET='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'
const REDIRECT_URI='https://developers.google.com/oauthplayground'


const REFREST_TOKEN ='1//04s7wF0MGNs5HCgYIARAAGAQSNwF-L9IrMlOlnkxGeCbYrxpkHUa3txt-WjC2KyowPFCWDAHCa7A6jJXKjF6fFFMgxzMtBAJknfs'



const oauth2Client= new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

oauth2Client.setCredentials({refresh_token: REFREST_TOKEN})

//initialize drive

const drive = google.drive({
    version:'v3',
    auth:oauth2Client
})

// file path
const filePath=path.join(__dirname,'asdf.jpg')

async function uploadFile(){
    try{
        const response=await drive.files.create({
            requestBody:{
                name:'myselectedName.jpg',
                memeType: 'image/jpg'
            },
            media:{
                mimeType:'image/jpg',
                body: fs.createReadStream(filePath)
            }
        })
        console.log(response.data)
    }
    catch(error){
        console.log(error.message)
    }
}

uploadFile();

async function deleteFile(){
    try{
        const response = await drive.files.delete({
            fileId:'1F5GhAaC2UHcX3vX2dxCIGAMfzKhJ-dvl',

        })
        console.log(response.data, response.status)
    }
    catch(error){
        console.log(error.message)
    }
}

// deleteFile()

async function generatePublicUrl(){
    try{
        const fileId='1QRJZt9rqBRWysq50Y1MtehNJhOaGOovR'
        await drive.permissions.create({
            fileId: fileId,
            requestBody:{
                role:'reader',
                type:'anyone'
            }
        });

        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink, thumbnailLink, iconLink',
        });
        console.log(result.data)

    }catch(error){
        console.log(error.message)
    }
}

// generatePublicUrl()
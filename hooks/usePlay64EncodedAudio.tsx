import Sound from "react-native-sound";
import { writeFile,unlink, DocumentDirectoryPath, exists } from "react-native-fs";


const usePlay64EncodedAudio = () => {
  return playAudioAsync;
};
async function playAudioAsync(audio64: string): Promise<void> {
  let filePath:string = "";
  try{
    filePath = await trySavingAudioToFile(audio64);
  }catch(error){
    return Promise.reject();
  }
  
  
  try{
    playAudioFromFile(filePath);
    tryDeletingFile(filePath);
    return Promise.resolve();
  }catch(error){
    tryDeletingFile(filePath);
    return Promise.reject();
  }
}


function getRandomFileAttachment(): string {
  return Math.random().toString();
}
function getRandomFilePath(): string {
  return `${DocumentDirectoryPath}/${getRandomFileAttachment()}.aac`;
}

async function trySavingAudioToFile(audio64: string): Promise<string> {
  const randomFilePath:string = getRandomFilePath();
  try{
    await writeFile(randomFilePath,audio64,'base64');
    return Promise.resolve(randomFilePath);
  }catch(error){
    return Promise.reject();
  }
}

function playAudioFromFile(filePath: string) {
    const sound = new Sound(filePath, '',
    (error) => {
      sound.play();
    });
}

function tryDeletingFile(filePath: string) {
  exists(filePath)
    .then((res) => {
      if(res) unlink(filePath);
    });
}

export default usePlay64EncodedAudio;
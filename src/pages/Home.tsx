import { useState } from "react";
import { storage } from "../utils/firebase/storage";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  CircularProgress,
  Input,
  Alert,
  AlertTitle,
  Button,
  Grid,
} from "@mui/material";
import { getAnalytics, logEvent } from "firebase/analytics";

function Home() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const analytics = getAnalytics();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = (e.target as any)[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
    logEvent(analytics, "upload_file", {
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
    });
  };

  return (
    <Grid container sx={{ justifyContent: "center", px: 2, py: 1 }}>
      <form onSubmit={handleSubmit}>
        <Input type="file" />
        <Button type="submit" variant="contained" sx={{ ml: 2 }}>
          Submit
        </Button>
      </form>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {progresspercent > 0 && progresspercent < 100 && <CircularProgress />}
      </div>
      {imgUrl && progresspercent === 100 && (
        <>
          <Alert severity="success" sx={{ width: "100%", my:2 }}>
            <AlertTitle>Uploaded successfully. Here is your image!</AlertTitle>
          </Alert>
          <img
            src={imgUrl}
            alt="uploaded"
            style={{ maxWidth: "500px", maxHeight: "500px" }}
          />
        </>
      )}
    </Grid>
  );
}

export default Home;

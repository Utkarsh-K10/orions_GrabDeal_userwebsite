import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./ImageUpload.css";
import { useState } from "react";
import AvForm from "availity-reactstrap-validation/lib/AvForm";
import { useHistory, useParams } from "react-router";
import Notiflix from "notiflix";
import loaderImg from "../../Home/ProductList/assets/circles.svg";

const ImageUpload = () => {
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    setLoading(true);
    e.persist();

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    fetch(`${process.env.REACT_APP_USER_API}/${id}/uploadpic`, {
      method: "PUT",

      // headers: {
      //   Authorization: "Bearer" + " " + adminVerify.token,
      // },
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        setLoading(false);
        // data && setAddSuccess(true);
        console.log(data);
        if (data === "Please upload file") {
          alert("Please upload file");
        } else {
          Notiflix.Report.success(
            "Success",
            "Profile Picture Uploaded Successfully",
            "Okay",
            {
              cancelButtonColor: "#ffffff !important",
              okButtonColor: "#ffffff !important",
              success: {
                svgColor: "#297d8e",
                titleColor: "#1e1e1e",
                messageColor: "#242424",
                buttonBackground: "#297d8e",
                buttonColor: "white",
                backOverlayColor: "rgba(0,0,0,0)",
              },
            }
          );

          window.location.reload();
        }

        //
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onChange = (e) => {
    setFile(e.file.originFileObj);
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const loader = () => {
    return (
      <div className="text-center align-middle d-flex justify-content-center mt-5">
        <img className="loader" src={loaderImg} alt="not found"></img>
      </div>
    );
  };
  return (
    <>
      {loading ? (
        // loader()
        Notiflix.Loading.hourglass({
          backgroundColor: "rgba(0,0,0,0)",
          svgColor: "#297d8e",
        })
      ) : (
        <div className="container">
          <div className="cart-title mb-5">
            <h3>Update Your Profile Picture</h3>
          </div>
          <AvForm className="mb-5" onValidSubmit={(e) => handleSubmit(e)}>
            <Upload
              onChange={onChange}
              customRequest={dummyRequest}
              listType="picture"
              className="upload-list-inline"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Choose Image</Button>{" "}
            </Upload>
            {file && <button className="p-2 btn-primary">Upload</button>}
          </AvForm>
        </div>
      )}
    </>
  );
};
export default ImageUpload;

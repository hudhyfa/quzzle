export default function Loading(): React.ReactNode {
  const styleObject: any = {
    width: "90%",
    height: "90vh",
    marginTop: "20px",
    marginBottom: "40px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "row",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    borderRadius: "15px",
  };

  return (
    <div className="loading-page" style={styleObject}>
      <img
        src="/loadingGifThree.gif"
        alt=""
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

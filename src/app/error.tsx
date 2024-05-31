"use client"
export default function RootError({errMessage}: {errMessage: string}) {
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
        borderRadius: "15px"
      };
    return (
        <>
            <div className="error-container" style={styleObject}>
                <div className="">
                    <h2>{errMessage}</h2>
                </div>
            </div>
        </>
    )
}
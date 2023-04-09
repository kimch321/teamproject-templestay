import shortid from "shortid";

export default function TempleContent({templeContent}) {
    return(
        <div id="contentWrapper" style={{marginTop:`112px`}}>
            <div id="contentContainer">
                <h1 className="fw-bold text-primary ps-4 mb-1"
                    id="contentTitle" key={shortid.generate()} >{templeContent.T_NAME}</h1>
                <p className={'mb-0 text-primary fs-2 ps-4'}>{templeContent.T_COPY}</p>
                <p className="fs-4 pt-1 ps-4 " style={{marginTop:`28px`}}
                   id="content" >
                    {templeContent.T_DES}
                </p>
            </div>
        </div>
    )
}
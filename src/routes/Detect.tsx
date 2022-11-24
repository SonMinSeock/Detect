import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchDetectImage } from "./api";

function Detect() {
    const { isLoading, data } = useQuery("detect_img", fetchDetectImage);

    const Wrapper = styled.div`
        display: flex;
        flex-direction: column;
        align-items:  center;
    `;

    const Header = styled.div`        
        display: flex;
        width: 100%;
        background-color: yellow;
        justify-content: center;
        align-items: center;
        padding-top: 30px;

    `

    const ImgContainer = styled.div`
    
        display: flex;
        justify-content: center;
        align-items: center;        
    `;

    const Img = styled.img`
       
    `;

    const Button = styled.div`
        padding: 5px;
        border: 1px solid #000;
        margin-top: 10px;
        display: flex;
        align-items: center;

    `
    console.log("feteching data img : ", data);
    return isLoading ? null :  (
        <Wrapper>
            <Header>
                <Button>
                    <Link to="/">Show Chart</Link>
                </Button>
            </Header>
            <ImgContainer>
                <Img src={data.root}/>
            </ImgContainer>
        </Wrapper>
    ) 
}

export default Detect;
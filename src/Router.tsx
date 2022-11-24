import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chart from "./routes/Chart";
import Detect from "./routes/Detect";

interface IRouterProps {
   
}

function Router({}: IRouterProps) {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/detect">
                <Detect />
            </Route>
            <Route path="/">
                <Chart />
            </Route>
        </Switch>
        </BrowserRouter>
    )
}

export default Router;
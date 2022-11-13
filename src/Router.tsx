import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chart from "./routes/Chart";

interface IRouterProps {
   
}

function Router({}: IRouterProps) {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/">
                <Chart />
            </Route>
        </Switch>
        </BrowserRouter>
    )
}

export default Router;
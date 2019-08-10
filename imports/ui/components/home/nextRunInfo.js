import React from 'react';

import {getRunInfo} from '../formatHelpers.js'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardHeader } from 'reactstrap';

class NextRunInfo extends React.Component {

    render() {
        let result = <>

                No upcoming runs.
                <br />
                Consider planning a run or see our suggestions.

            </>
        if (this.props.runs.length > 0) {
            let run = this.props.runs[0];

            result = getRunInfo(run);
        }
        return (
            <>
                <Card>
                <CardHeader tag="h2"> Upcoming Run</CardHeader>
                <CardBody>
                <CardText>
                {result}
                </CardText>
                </CardBody>
                </Card>
            </>
        )
    }
}

export default NextRunInfo;

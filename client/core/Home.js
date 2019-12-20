import { Component } from "react"
import { Card, Typography, CardMedia, CardContent } from "@material-ui/core"


cosnt styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: theme.spacing(5),
        color: theme.palette.text.secondary
    },
    media: {
        minHeight: 330
    }
})

class Home extends Component {
    render() {
        const {classes} = this.props
        return (
            <div>
                <Card className={classes.card}>
                    <Typography type="headline" component="h2" className={classes.title}>Home Page</Typography>
                    <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells" />
                    <CardContent>
                        <Typography type="body1" component="p">
                            Welcome to the mern Skeleton home page
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes
}
import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {
    CssBaseline,
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Drawer,
    Divider,
    Hidden,
    Switch,
    ListSubheader,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { withStyles, createTheme } from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";
import Instagram from "@material-ui/icons/Instagram";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import WhatsApp from "@material-ui/icons/WhatsApp";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemButton from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import Subscriptions from "@material-ui/icons/Subscriptions";
import Whatshot from "@material-ui/icons/Whatshot";
import VideoLibrary from "@material-ui/icons/VideoLibrary";
import History from "@material-ui/icons/History";
import AddCircle from "@material-ui/icons/AddCircle";
import AccountCircle from "@material-ui/icons/AccountCircle";
const useStyles = (theme) => ({
    root: {
        display: "flex",
        background: "#C4C4C4",
    },
    color: {
        primary: {
            main: "#F7D2DA",
        },
        secondary: {
            main: "#57160A",
        },
        white: {
            main: "#ffffff",
        },
        grey: {
            main: "#C4C4C4",
        },
    },
    menuTop: {
        background: "#F7D2DA",
        zIndex: theme.zIndex.drawer + 1,
    },
    space: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    card: {
        maxWidth: 350,
    },
    header: {
        padding: "0 0 8px 0 !important",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
    },
    header_card: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        height: "100%",
    },
    header_cart: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        width: "2em",
        height: "2.4em",
    },
    title: {
        color: "#57160A",
        height: "50%",
    },
    header_child: {
        padding: "0px",
        margin: "0px",
        height: "10vh",
    },
    header_child1: {
        padding: "0px",
        margin: "0px",
        backgroundColor: "#F7D2DA",
        height: "10vh",
        width: "100%",
    },
    filter_container: {
        marginTop: "8px",
        marginBottom: "8px",
    },
    categories_button: {
        justifyContent: "center",
        display: "flex",
    },
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    appBar: {
        boxShadow: "none",
        zIndex: theme.zIndex.drawer + 1,
    },
    logo: {
        height: 25,
    },
    drawer: {
        width: "20%",
        flexShrink: 0,
    },
    drawerPaper: {
        width: "20%",
        borderRight: "none",
    },
    menuIcon: {
        paddingRight: theme.spacing(5),
        paddingLeft: theme.spacing(6),
    },
    icons: {
        paddingRight: theme.spacing(5),
    },
    grow: {
        flexGrow: 1,
    },
    listItemText: {
        fontSize: 14,
    },
    listItem: {
        paddingTop: 4,
        paddingBottom: 4,
    },
    subheader: {
        textTransform: "uppercase",
    },
    bottomMenu: {
        background: "#ffffff",
        height: "4.5em",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    sideLogo: {
        width: "100%",
        borderRadius: "30px",
    },
    cardButton: {
        minHeight: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    cardImg: {
        maxHeight: 350,
        width: "100%",
    },
    cardText: {
        height: "200px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
    },
    teste: {
        backgroundColor: "#fff00fff",
    },
});

class HomePage extends Component {
    state = {
        searchNodes: "",
        listItem: [],
        listCategoria: [],
        checked: [],
        dialogOpen: false,
    };

    constructor(props) {
        super(props);

        // this.loadItem()
        // this.loadCategory()
        this.loadItemByCategory();
    }

    handleToggle(value) {
        let newChecked = [value];
        if (newChecked == -1) {
            this.loadItem();
        } else this.loadItem(newChecked.map((item) => item.id).join());
    }

    async loadItem(category) {
        var uri = "/listProdutos?category=";
        if (category) {
            uri = uri + category;
        }
        fetch(uri)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    listItem: data.map((item) => ({
                        title: item.titulo,
                        description: item.descricao,
                        image: item.foto,
                    })),
                });
            });
    }

    async loadGroupedItem(categories) {
        var uri = "/listProdutos";
        debugger;
        fetch(uri)
            .then((response) => response.json())
            .then((data) => {
                let listGroupItem = [];
                categories.forEach((item) => {
                    let produtosDaCategoria = data.filter(
                        (element) => element.categoria_id == item.id
                    );
                    if (produtosDaCategoria.length > 0) {
                        listGroupItem.push({
                            id: item.id,
                            description: item.nomeCategoria,
                            items: data.filter(
                                (element) => element.categoria_id == item.id
                            ),
                        });
                    }
                });
                this.setState({
                    listCategoria: [
                        {
                            id: -1,
                            description: "Todos",
                        },
                    ].concat(
                        listGroupItem.map((item) => ({
                            id: item.id,
                            description: item.description,
                        }))
                    ),
                    listItem: listGroupItem.concat([
                        {
                            id: -1,
                            description: "Todos",
                            items: data,
                        },
                    ]),
                });
            });
    }

    async loadCategory() {
        fetch("/listCategoria")
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    listCategoria: [
                        {
                            id: -1,
                            description: "Todos",
                        },
                    ].concat(
                        data.map((item) => ({
                            id: item.id,
                            description: item.nomeCategoria,
                        }))
                    ),
                });
            });
    }

    async loadItemByCategory() {
        fetch("/listCategoria")
            .then((response) => response.json())
            .then((data) => {
                //   this.setState({
                //    listCategoria: [
                //       {
                //         id:-1,
                //         description:"Todos",
                //       }
                //     ].concat(
                //       data.map(
                //         (item) => ( {
                //           id:item.id,
                //           description:item.nomeCategoria,
                //         } )
                //       )
                //     )
                //   })
                this.loadGroupedItem(data);
            });
    }
    showAlert = (description) => {
        alert(description);
    };
    goToAnotherUrl = (url) => {
        window.open(url, "_blank").focus();
    };
    goToWhatsApp = () => {
        this.goToAnotherUrl(
            "https://api.whatsapp.com/send?phone=5511985935897&text=Estou%20contatando%20pelo%20site%20para%20saber%20mais%20sobre..."
        );
    };
    goToInstagram = () => {
        this.goToAnotherUrl(
            "https://www.instagram.com/confeitariadocesonho2106/"
        );
    };
    dialogOpen = () => {
        this.setState({
            dialogOpen: true,
        });
    };
    dialogHandleClose = () => {
        this.setState({
            dialogOpen: false,
        });
    };
    render() {
        const { classes } = this.props;
        let InstagramColorButton = withStyles((theme) => ({
            root: {
                color: "#FFFFFF",
                backgroundColor: "#E4405F",
                "&:hover": {
                    backgroundColor: pink[300],
                },
            },
        }))(Button);

        let WhatsAppColorButton = withStyles((theme) => ({
            root: {
                color: "#FFFFFF",
                backgroundColor: "#25D366",
                "&:hover": {
                    backgroundColor: green[300],
                },
            },
        }))(Button);

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.menuTop}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className="menuButton"
                            color="inherit"
                            aria-label="menu"
                        />
                        <Typography variant="h4" className={classes.title}>
                            Confeitaria Doce Sonho
                        </Typography>
                        <div className={classes.space} />
                        <Button color="inherit">
                            <CardMedia
                                component="svg"
                                alt=""
                                image="../static/images/sacola.svg"
                                title=""
                                className={classes.header_cart}
                            />
                        </Button>
                    </Toolbar>
                    <Grid className={classes.bottomMenu}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item>
                                <InstagramColorButton
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<Instagram />}
                                    onClick={() => this.goToInstagram()}
                                >
                                    Instagram
                                </InstagramColorButton>
                            </Grid>
                            <Grid item></Grid>
                            <Grid item>
                                <WhatsAppColorButton
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<WhatsApp />}
                                    onClick={() => this.goToWhatsApp()}
                                >
                                    WhatsApp
                                </WhatsAppColorButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </AppBar>
                <Grid container className={classes.root} spacing={3}>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            spacing={0}
                        >
                            <Grid item xs={6}>
                                <Drawer
                                    className={classes.drawer}
                                    variant="permanent"
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                >
                                    <Toolbar />
                                    <Toolbar />
                                    <div className={classes.drawerContainer}>
                                        <Box p={2}>
                                            <CardMedia
                                                component="img"
                                                alt=""
                                                image="../static/images/logo.png"
                                                title=""
                                                className={classes.sideLogo}
                                            />
                                        </Box>
                                        <Divider />
                                        {this.state.listCategoria.map(
                                            (item, index) => (
                                                <CardActionArea
                                                    key={index}
                                                    onClick={() =>
                                                        this.state.checked.indexOf(
                                                            item
                                                        ) !== -1
                                                    }
                                                >
                                                    <ListItem>
                                                        <ListItemText>
                                                            <Typography align="center">
                                                                {
                                                                    item.description
                                                                }
                                                            </Typography>
                                                        </ListItemText>
                                                    </ListItem>
                                                </CardActionArea>
                                            )
                                        )}
                                        <Divider />
                                    </div>
                                </Drawer>
                                <Toolbar />

                                {/* <Box p={8}> */}
                                {/* <Toolbar /> */}
                                {/* <Grid container spacing={4}  >
											{ this.state.listItem.map((item,index) => (         
												<Box key={index} width='100%'>
												<Typography
												variant='h5'
												color='inherit'
												style={{ fontWeight: 600 }}
												align="center"
											>            
												<Toolbar />
												{item.description}
											</Typography>    
									<Grid lg={3} md={4} sm={6} xs={12}>
									<Grid container justify="center" spacing={2}>
											{ item.items.map((item,index) => (
														<Grid item key={index}>
											
															<Card className={classes.card} >
																<CardActionArea onClick={() => showAlert(item.title) }>
																	<CardMedia
																	component="img"
																	alt={item.titulo}
																	height="300"
																	image={"../static/" + item.foto}
																	title={item.titulo}
																	/>
																	<CardContent>
																		<Typography gutterBottom variant="h5" component="h2">
																			{item.titulo}
																		</Typography>
																		<Typography variant="body2" color="textSecondary" component="p">
																			{item.descricao}
																		</Typography>
																	</CardContent>
																</CardActionArea>
															</Card>
														</Grid>
																))}     
																</Grid>         
																</Grid>
													</Box>
											
															))}            
											</Grid> */}
                                {/* </Box> */}
                            </Grid>
                            {/* <Grid item sm={6} className={classes.teste}>   
										<Grid container justifyContent="center" spacing={2} >
										{ this.state.listItem.map((item,index) => (    
											 item.items.map((item,index) => (
												<Grid item key={index}>											
															<Card className={classes.card} >
																<CardActionArea onClick={() => showAlert(item.title) }>
																	<CardMedia
																	component="img"
																	alt={item.titulo}
																	height="300"
																	image={"../static/" + item.foto}
																	title={item.titulo}
																	/>
																	<CardContent>
																		<Typography gutterBottom variant="h5" component="h2">
																			{item.titulo}
																		</Typography>
																		<Typography variant="body2" color="textSecondary" component="p">
																			{item.descricao}
																		</Typography>
																	</CardContent>
																</CardActionArea>
															</Card>
														</Grid>
												)) 
												))}   
										</Grid>
									</Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default withStyles(useStyles, { withTheme: true })(HomePage);

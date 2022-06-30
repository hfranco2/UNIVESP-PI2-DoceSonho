import React, {useRef,useState, useContext, useEffect} from 'react';
import { HashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Instagram from "@material-ui/icons/Instagram";
import WhatsApp from "@material-ui/icons/WhatsApp";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import { makeStyles, useTheme, createTheme, withStyles, ThemeProvider} from '@material-ui/core/styles';
import { green, pink } from "@material-ui/core/colors";
import { DialogContentText, Grid } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Context from "./store/Context";
import Cart from "./Cart";
import Product from "./Product";
import GlobalStyles from "./GlobalStyles";
import { NavBar, OverLay, MainContainer, ProductList } from "./AppStyles";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    header_cart: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        width: "2em",
        height: "2.4em",
    },
    sideLogo: {
        width: "100%",
        borderRadius: "30px",
    },
    space: {
        flexGrow: 1,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiBackdrop-root": {
            display: "none"
        }
        },
        
    },
    card: {
        maxWidth: 350,
        height:500
    },
    bottomMenu: {
        background: "#ffffff",
        padding: '15px',
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: "#F7D2DA",
        
    },
    toolbarWithBackground: {
        background: "#F7D2DA",
        
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
        display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    dialogRoot: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    catg:{
        textDecoration:'none',
        color:'#57160A'
    }
   
}));

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.dialogRoot} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
            </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const handleChange = event => {
    const result = event.target.value.replace(/\D/g, '');

    setValue(result);
  };

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        isNumericString
      />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function ResponsiveDrawer(props) {
    React.useEffect(() => {
        loadItemByCategory()
      }, []);
    
    const { windowProps } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [listItem, setListItem] = React.useState([]);
    const [listCategoria, setListCategoria] = React.useState([]);
    const [checked, SetChecked] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [clickedItem,setClickedItem] = React.useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const InstagramColorButton = withStyles((theme) => ({
        root: {
            color: "#FFFFFF",
            backgroundColor: "#E4405F",
            "&:hover": {
                backgroundColor: pink[300],
            },
        },
    }))(Button);

    const WhatsAppColorButton = withStyles((theme) => ({
        root: {
            color: "#FFFFFF",
            backgroundColor: "#25D366",
            "&:hover": {
                backgroundColor: green[300],
            },
        },
    }))(Button);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const showItem = (item) => {
        setOpen(true);
        setClickedItem(item);
console.log(item)
    };
    const loadGroupedItem = async (categories) => {
        var uri = "/listProdutos";

        fetch(uri)
            .then((response) => response.json())
            .then((data) => {
                let listGroupItem = [];
                listGroupItem.push(
                    {
                        id: -1,
                        description: "Todos",
                        items: data,
                    }
                )
                categories.forEach((item) => {
                    let produtosDaCategoria = data.filter(
                        (element) => element.categoria_id == item.id
                    );
                    if (produtosDaCategoria.length > 0) {
                        listGroupItem.push({
                            id: item.id,
                            description: item.nomeCategoria,
                            items: produtosDaCategoria,
                        });
                    }
                });
                setListCategoria(
                    listGroupItem.map((item) => ({
                        id: item.id,
                        description: item.description,
                    }))
                );
                setClickedItem(listGroupItem[0].items[0]);
                setListItem(
                    listGroupItem
                );
                
            });
    }

    const loadItemByCategory = async () => {
        fetch("/listCategoria")
            .then((response) => response.json())
            .then((data) => {
                loadGroupedItem(data);
            });
    }

  const drawer = (
    <div>
        <Toolbar className={classes.toolbarWithBackground}/>
        <Toolbar className={classes.toolbarWithBackground}/>
        <Box p={2} >
            <CardMedia
                component="img"
                alt=""
                image="../static/images/logo.png"
                title=""
                className={classes.sideLogo}
            />
        </Box>
        <Divider />
        {listCategoria.map(
                                    (item, index) => (
                                        <HashLink to={`#${item.description}`}                                       
                                        activestyle={{ textDecoration:'underline'}}
                                        className={classes.catg}
                                        scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'end' })}>
                                        <CardActionArea
                                            key={index}
                                            onClick={() =>
                                                checked.indexOf(
                                                    item
                                                ) !== -1                                           
                                            }
                                        >
                                            <CardContent>
                                                <Typography align="center">
                                                    {item.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        </HashLink>
                                    )
                                )}
        
    </div>
  );

  const container = windowProps !== undefined ? () => windowProps().document.body : undefined;

    const goToAnotherUrl = (url) => {
       window.open(url, "_blank").focus();
    };

    const goToWhatsApp = () => {
        goToAnotherUrl(
            "https://api.whatsapp.com/send?phone=5511985935897&text=Estou%20contatando%20pelo%20site%20para%20saber%20mais%20sobre..."
        );
    };

    const goToInstagram = () => {
        goToAnotherUrl(
            "https://www.instagram.com/confeitariadocesonho2106/"
        );
    };
      const [isToggle, setToggle] = useState(false);
      const context = useContext(Context);


  return (
    <div className={classes.root}>
        { clickedItem != null &&
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
           
                     <img
                        style={{ width: '100%', height: 'auto' }}
                        src={"../static/" + clickedItem.foto}
                        alt="image"
                        />
                <DialogContent dividers>
                <Product
                key={clickedItem.ID}
                id={clickedItem.ID}
                imageURL={clickedItem.foto}
                price={clickedItem.preco}
                title={clickedItem.titulo}
                addProductToCart={context.addProductToCart}
                />
                </DialogContent>
            </Dialog>
        }
      
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h4" className={classes.title}>
                Confeitaria Doce Sonho
            </Typography>
            <div className={classes.space} />
            <Button color="inherit">
              <Cart
          isToggle={isToggle}
          setToggle={setToggle}
          carts={context.carts}
          removeProductFromCart={context.removeProductFromCart}
          clearCart={context.clearCart}
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
                <Grid item  >
                    <InstagramColorButton
                        variant="outlined"
                        color="primary"
                        startIcon={<Instagram />}
                        onClick={goToInstagram}
                    >
                        Instagram
                    </InstagramColorButton>
                </Grid>
                <Grid item></Grid>
                <Grid item >
                    <WhatsAppColorButton
                        variant="outlined"
                        color="primary"
                        startIcon={<WhatsApp />}
                        onClick={goToWhatsApp}
                    >
                        WhatsApp
                    </WhatsAppColorButton>
                </Grid>
            </Grid>
        </Grid>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Toolbar />
        <Toolbar />
        { listItem.map((item,index) => ( 
            <div id={item.description}>      
                <Typography
                    variant='h5'
                    color='inherit'
                    style={{ fontWeight: 600 }}
                    align="center"
                    useref={item.description}
                >            
                    <Toolbar />
                    {item.description}
                </Typography>   
                <Grid container justifyContent="center" spacing={2} key={index}>
                    { item.items.map((item,index) => (
                        <Grid item key={item.id}>
            
                            <Card className={classes.card} >
                                <CardActionArea onClick={() => showItem(item) }>
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
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.preco}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))} 
                </Grid>               
            </div>
        ))}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  //TODO(remove windowProps)
   windowProps: PropTypes.func,
};

export default ResponsiveDrawer;
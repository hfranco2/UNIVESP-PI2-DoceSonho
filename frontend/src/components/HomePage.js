import React, {useRef} from 'react';
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
import { makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import { green, pink, purple } from "@material-ui/core/colors";
import { CardActions, DialogContentText, Grid } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';

const drawerWidth = 240;

//Estilos
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
    },
    cartCardMedia: {
        borderRadius: "30px",
        margin: "5px"
    },
    numberButton:{
        magin: "0px",       
        height: "100%",
        width: "100%",
        borderRadius: "0"
    },
    numberButtonParent:{
        width:"200px"
    },
    numberGridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(0),
        width: "200px"
    },
    bottomItemDialogGrid: {

    },
    bottomMenu: {
        background: "#ffffff",
        padding: '15px',
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    dialogPaper: {
        height: "100%",
        maxHeight: "100%",
        margin:"0px",
        position:'absolute',
        right:0,
        bottom:0,
        top:0
    },
    cartDialogParentDiv: {
        color:"#F7D2DA",
        backgroundColor:"#F7D2DA",
    },
    cartDialogHeaderDiv: {
        padding: "48px",
        backgroundColor:"#F7D2DA",
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
    }
}));



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

const goToAnotherUrl = (url) => {
    window.open(url, "_blank").focus();
};


function ResponsiveDrawer(props) {
    //função chamada no inicio do carregamentos da tela
    React.useEffect(() => {
        loadItemByCategory()
      }, []);

    //propiedades que definem o estado do componente
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [listItem, setListItem] = React.useState([]);
    const [listCategoria, setListCategoria] = React.useState([]);
    const [listCart, setListCart] = React.useState([]);
    const [checked, SetChecked] = React.useState([]); //remover quando implementar filtro de listagem
    const [itemDialogOpen, setItemDialogOpen] = React.useState(false);
    const [clickedItem,setClickedItem] = React.useState(null);
    const [cartDialogOpen, setCartDialogOpen] = React.useState(false);
    const [cartQuantityToAdd, setCartQuantityToAdd] = React.useState(1);
    
    //funções
    const increaseCartQuantity = () => {
        setCartQuantityToAdd(cartQuantityToAdd+1);
    };

    const decreaseCartQuantity = () => {
        if(cartQuantityToAdd <= 1) return;
        setCartQuantityToAdd(cartQuantityToAdd-1);
    };

    const handleChange = event => {
        const result = event.target.value.replace(/\D/g, '');

        setCartQuantityToAdd(result);
    };

    const itemDialogHandleClose = () => {
        setCartQuantityToAdd(1);
        setItemDialogOpen(false);
    };

    const cartDialogHandleClose = () => {
        setCartDialogOpen(false);
    };

    const showCartDialog = () => {
        setCartDialogOpen(true);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const showItem = (item) => {
        setItemDialogOpen(true);
        setClickedItem(item);
    };

    const buyRedirectToWhatsApp = () => {

        let pedidos = listCart.map((item, index) => 
            (` *${item.item.titulo}* x ${item.quantity} - valor: _R$ ${item.quantity * item.item.preco}_ `)
        )
        .join()

        let text = `Olá, estou entrando em contato pelo site. Gostaria de fazer os seguintes pedidos: ${pedidos}.
                    Aguardo contato para combinar método de pagamento e datas disponíveis.`
        
        goToAnotherUrl(
            `https://api.whatsapp.com/send?phone=5511985935897&text=${text}`
        );
    };

    const setCartFromResult = async (data,items) => {
        let dictionaryWithCartItems = data[1] 
        let mappedCartItems = []

        for (let key in dictionaryWithCartItems) 
        { 
            mappedCartItems.push({"id":key,"quantity":data[1][key].quantity,"item":items.find(element => element.ID == key)}) 
        }

        setListCart(mappedCartItems)
    };

    const loadCart = async (items) => {
        var uri = "/listCart";
        fetch(uri)
            .then((response) => response.json())
            .then((data) => {
                setCartFromResult(data,items)
            })
    };

    const loadGroupedItem = async (categories) => {
        var uri = "/listProdutos";
        debugger;
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
                loadCart(data);
                
            });
    }

    const loadItemByCategory = async () => {
        fetch("/listCategoria")
            .then((response) => response.json())
            .then((data) => {
                loadGroupedItem(data);
            });
    }

    const addToCart = (item,itemsList) => {

        fetch(`/listCart/add/${item.ID}qtd${cartQuantityToAdd}`)
            .then(response => response.json())
            .then(data => {
                setCartFromResult(data,itemsList)
                setCartQuantityToAdd(1)
                setItemDialogOpen(false)
            });

    };

    const removeFromCart = (item,itemsList) => {
        fetch(`/listCart/remove/${item.ID}`)
        .then(response => response.json())
        .then(data => {
            setCartFromResult(data,itemsList)
            setCartQuantityToAdd(1)
        });
    };

   
    
    //function components para serem usados internamente no componente
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

    const ColorButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(purple[500]),
          backgroundColor: purple[500],
          '&:hover': {
            backgroundColor: purple[700],
          },
        },
      }))(Button);

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
                                    )
                                )}
        
    </div>
  );

  
    const DialogContent = withStyles((theme) => ({
        root: {
            padding: theme.spacing(2),
        },
    }))(MuiDialogContent);

    const DialogActions = withStyles((theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
    }))(MuiDialogActions);


  return (
    <div className={classes.root}>
        { clickedItem != null &&
            <Dialog onClose={itemDialogHandleClose}  open={itemDialogOpen}>
           
                     <img
                        style={{ width: '100%', height: 'auto' }}
                        src={"../static/" + clickedItem.foto}
                        alt="image"
                        />
                <DialogContent >
                    
                        <Typography gutterBottom variant="h5" component="h2">
                            {clickedItem.titulo}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {clickedItem.descricao}
                        </Typography>
                </DialogContent>
                <DialogActions>
                    <Grid container direction="row" justifyContent="flex-start" >
                        <Grid item xs={6} sm={3}>
                            <Typography gutterBottom variant="h5" component="h2">
                                R$ {clickedItem.preco}
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} sm={9}  
                            direction="row" 
                            alignItems='center' 
                            justifyContent="flex-end"
                            spacing={3}>
                                <Grid item xs={12} sm={6} >
                                    <Paper elevation={3} className={classes.numberButtonParent} >
                                        <div className={classes.numberGridContainer}>
                                            <div style={{ gridColumnEnd: 'span 4' }}>
                                                <Button 
                                                    variant="outlined" 
                                                    className={classes.numberButton}
                                                    onClick={() => decreaseCartQuantity()} >-</Button>
                                            </div>
                                            <div style={{ gridColumnEnd: 'span 4' }}>
                                                <input
                                                    style={{textAlign: "center"}} 
                                                    type="text" 
                                                    className={classes.numberButton}  
                                                    value={cartQuantityToAdd}
                                                    onChange={handleChange}/>
                                            </div>
                                            <div style={{ gridColumnEnd: 'span 4' }}>
                                                <Button 
                                                    variant="outlined" 
                                                    className={classes.numberButton}  
                                                    onClick={() => increaseCartQuantity()}>+</Button>
                                            </div>
                                        </div>
                                    </Paper>    
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                    <Button
                                        style={{magin:"3px"}}
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => addToCart(clickedItem,listItem[0].items)}
                                        startIcon={<ShoppingCart />}>
                                        Comprar
                                    </Button>
                                </Grid>
                            
                            
                            
                        </Grid>
                        
                    </Grid>
                </DialogActions>
            </Dialog>
        }

    <Dialog onClose={cartDialogHandleClose}  open={cartDialogOpen} classes={{ paper: classes.dialogPaper }}>
        {listCart != null &&
            <div >
                {/* Carrinho - Header */}
                <div  className={classes.cartDialogHeaderDiv}>
                    <Grid container direction="row" alignItems="center">
                        <Grid item>
                            <Typography variant="h4" component="h2">
                            Carrinho ({listCart.length})                            
                            </Typography>
                        </Grid>
                        <Grid item>
                        <IconButton
                            color="inherit"
                            aria-label="close cart"
                            edge="start"
                            onClick={cartDialogHandleClose}
                            style={{margin: theme.spacing(1),}}
                           >
                            <CloseIcon fontSize="large" />
                        </IconButton>
                        </Grid>
                        
                    </Grid>
                    
                </div>
                {/* Carrinho - Items */}
                <div style={{padding:"5px"}}>
                    <Grid container spacing={1} direction="column" >
                    { listCart.map((cart,index) => (
                            <Grid item key={index}>
                
                                <Card className={classes.card} elevation={5}>
                                    <Grid container direction="row" alignItems='center'>
                                        <Grid item xs={8} sm={4}>
                                            <CardMedia
                                            component="img"
                                            alt={cart.item.titulo}
                                            height="150"
                                            image={"../static/" + cart.item.foto} 
                                            title={cart.item.titulo}
                                            className={classes.cartCardMedia} 
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {cart.item.titulo}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {cart.item.descricao}
                                                </Typography>
                                            </CardContent>
                                            
                                        </Grid>
                                    </Grid>
                                    <CardActions>
                                        <IconButton
                                                color="inherit"
                                                aria-label="close cart"
                                                edge="start"
                                                style={{margin: theme.spacing(1),
                                                float: "left" }}
                                                onClick={() => removeFromCart(cart.item,listItem[0].items)}
                                            >
                                                <DeleteIcon fontSize="medium" />
                                            </IconButton>
                                    </CardActions>
                                    
                                </Card>
                            </Grid>
                        ))} 
                    </Grid>
                </div>
                {/* Carrinho - Botão */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <ColorButton variant="contained" color="primary" onClick={buyRedirectToWhatsApp} style={{borderRadius: "30px", width: "80%"}}>
                        Continuar
                    </ColorButton>
                </div>
                
            </div>
        }
    </Dialog>
      
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
                <CardMedia
                    component="svg"
                    alt=""
                    image="../static/images/sacola.svg"
                    title=""
                    onClick={showCartDialog}
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
        {/* container={container} */}
          <Drawer
          
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
            <div>
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
};

export default ResponsiveDrawer;
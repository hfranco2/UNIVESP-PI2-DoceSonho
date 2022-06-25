import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { green, pink } from '@material-ui/core/colors';
import Instagram from '@material-ui/icons/Instagram';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button'
import WhatsApp from '@material-ui/icons/WhatsApp';
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = theme => ({
  root: {
    flexGrow: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 350
  },
  header: {
      padding: '0 0 8px 0 !important',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      maxHeight:'1em'
  },
  header_card: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)'

  },
  header_child: {
      padding:'0px',
      margin:'0px'
  },
  filter_container: {
    marginTop:'8px',
    marginBottom:'8px'
  },
  categories_button: {
    justifyContent:'center',
    display:'flex'
  }
});

class Cart extends Component {

  state = {
    searchNodes: "",
    listBolo: [],
    listCategory: [],
    checked: [],
    dialogOpen: false
  };

  constructor(props) {
    super(props);

    this.loadQuitute()
    this.loadCategory()
    
  }

  handleToggle(value) {
    const currentIndex = this.state.checked.indexOf(value);
    let newChecked = [...this.state.checked];
    
    if(value.id == -1) {
      if (currentIndex === -1) {
        newChecked = this.state.listCategory
      } else {
        newChecked = []
      }
    }
    else if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if(newChecked.length > 1 || (newChecked.length == 1 && newChecked[0].id != -1)) {
      this.loadQuitute(newChecked.map((item) => item.id).join())
    } else {
      newChecked = []
      this.loadQuitute()
    }

    this.setState({
      checked: newChecked
    });

    this.setState({
      dialogOpen: false
    });
  };

  async loadQuitute(category = ""){
    var uri = '/listQuitute?category='
    if(category){
      uri = uri + category
    }
    fetch(uri)
    .then((response) =>
          response.json()
    ).then((data) => {
      this.setState({
        listBolo: data.map(
          (item) => ( {
            title:item.titulo,
            description:item.descricao,
            image:item.foto
          } )
        )
      })
    });
  }
  
  async loadCategory() {
    fetch('/listCategoria')
    .then((response) =>
          response.json()
    ).then((data) => {
      this.setState({
        listCategory: [
          {
            id:-1,
            description:"Todos",
          } 
        ].concat(
          data.map(
            (item) => ( {
              id:item.id,
              description:item.nomeCategoria,
            } )
          )
        )
      })
      
    }); 
  }
           
  
  showAlert = (description) => {
    alert(description);
  }

  

  goToAnotherUrl = (url) => {
    window.open(url, '_blank').focus();
  }

  goToWhatsApp = () => {
    this.goToAnotherUrl("https://api.whatsapp.com/send?phone=5511985935897&text=Estou%20contatando%20pelo%20site%20para%20saber%20mais%20sobre...");
  }

  goToInstagram = () => {
    this.goToAnotherUrl("https://www.instagram.com/confeitariadocesonho2106/");
  }

  dialogOpen = () => {
    this.setState({
      dialogOpen: true
    });
  }

  dialogHandleClose = () => {
    this.setState({
      dialogOpen: false
    });

  } 

    render() {
      const { classes } = this.props;
      let InstagramColorButton = withStyles((theme) => ({
        root: {
          color: '#FFFFFF',
          backgroundColor: '#E4405F',
          '&:hover': {
            backgroundColor: pink[300],
          },
        },
      }))(Button);
      
    let WhatsAppColorButton = withStyles((theme) => ({
        root: {
          color: '#FFFFFF',
          backgroundColor: '#25D366',
          '&:hover': {
            backgroundColor: green[300],
          },
        },
      }))(Button);

     return (
        <div >
        test
        </div>
     );
    }
  
}

export default withStyles(useStyles, { withTheme: true })(Cart);
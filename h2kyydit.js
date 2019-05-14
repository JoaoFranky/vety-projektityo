

/*************************************
  Projektityön   omalta  verkkosivulta   (ja/tai  itse  Demosta)   pitää   käydä  ilmi  
  seuraavat asiat:
  o Palvelun  idea
  o Ohjeet  käyttäjälle,  ts. miten palvelua  käytetään
  *************************************/

  /*************************************
  Palvelusta  pitää voida tallentaa viestit tms.  Localstorageen  JSON-stringinä, 
  niin, että  uudelleenlatauksen  yhteydessä  viestit eivät häviä näkyvistä.  On  
  vielä parempi,  jos tallennus toimii  pilvessä  (esim.  Myjson.com)
  *************************************/

  /*************************************
  nähdä kaverit,  lisätä  kavereita itselleen,  
  lähettää   viesti,   nähdä   saapuneet   viestit jne.  Lisäksi   voit  keksiä  itse  uusia   ja 
  kokeellisia toimintoja.
  *************************************/

      class Palvelu {
        constructor() {
          this.kayttajalista = [];
          this.gridElements = [];
        }
      }

      class Kayttaja {  
        constructor() {
          this.saateViesti = [];
          this.kuva = "";
          this.meili = "";
          this.postilista = true;
        }
      }

    /*********************************
      Class gridElement on ns. container kuvalle,
      koostuu div:istä, jossa kuva ja alapalkki.
      Alapalkissa tykkäys-, ja jakonappulat.
    *********************************/
      class gridElement {
        constructor(kuva) {
          this.kuva = kuva;
          this.tykkaykset = 0;
          this.ID = "";
          this.liked = false;
          this.email = "";
          this.viesti = "moi...";
        }
      }

  /*****************************
    LocalStorage
  *****************************/

  //    - tallentaa tykkäykset
  //    - Käyttäjän ladattu kuva, eli gridElement
  //    - Käyttäjätiedot

    //LocalStorage.getItem("avain", JSON.stringify(var -olio))

    //JSON.parse()

   // JSON.parseInt()

  /*****************************
    Globaaleja muuttujia
  *****************************/

      var kayttaja = null;
      var viestipankki = [];

      //Kaikki kuvat
      var kuvapankki = ["1vetykyydit.png",
                        "2vetykyydit.png",
                        "3vetykyydit.png",
                        "4vetykyydit.png",
                        "5vetykyydit.png",
                        "6vetykyydit.png",
                        "7vetykyydit.png",
                        "8vetykyydit.png",
                        "1vetykyyditcopy.png",
                        "2vetykyyditcopy.png",
                        "3vetykyyditcopy.png",
                        "4vetykyyditcopy.png",
                        "5vetykyyditcopy.png",
                        "6vetykyyditcopy.png",
                        "7vetykyyditcopy.png",
                        "8vetykyyditcopy.png",];

      var extraKuvapankki = ["Hydro_Man_1_.jpeg",
                            "youtube-square-brands.svg",
                            "finland-hd.jpg",
                            "Punkaharju.jpg",
                            "woikoski-logo.jpg"];

      /**  KOLMANNE OSAPUOLEN KOODIA 
        Lähde: https://ourcodeworld.com/articles/read/278/how-to-split-an-array-into-chunks-of-the-same-size-easily-in-javascript

      * Returns an array with arrays of the given size.
      *
      * @param myArray {Array} array to split
      * @param chunk_size {Integer} Size of every group
      */
      
      function chunkArray(myArray, chunk_size) {
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray = [];
          
        for (index = 0; index < arrayLength; index += chunk_size) {
            myChunk = myArray.slice(index, index+chunk_size);
            // Do something if you want with the group
            tempArray.push(myChunk);
        }
        return tempArray;
      }

      /*****************************
        Onload funktiot
      *****************************/

        var gridElementLista = [];

        function lataaGrid() {

//yritetään ladata aiemmin tallennettu gridi local storagesta
        if (localStorage.getItem('gridElementLista')) {
            gridElementLista = JSON.parse(localStorage.getItem('gridElementLista'))
            console.log("JSON ladattu LocalStoragesta:")
            console.log(gridElementLista)
        } else {

      /*****************************
       ellei onnistu, luodaan uudet gridElementit
      *****************************/

        var tykkaykset = [35, 2, 26, 120,
                          49, 98, 86, 72,
                          79, 59, 34, 12,
                          110, 222, 32, 42]


        
          for (var k = 0; k < kuvapankki.length; k++) {
            var uusiGridElement = new gridElement(kuvapankki[k])
            uusiGridElement.tykkaykset = tykkaykset[k]  //Random amount of likes
            uusiGridElement.ID = k
            gridElementLista.push(uusiGridElement)
          } 
        localStorage.setItem('gridElementLista', JSON.stringify(gridElementLista))
        console.log(localStorage.getItem('gridElementLista'))
        }

      /*****************************
        Division into 4 COLUMNS-ARRAYS
      *****************************/ 

      //Jaetaan julkaistujen kuvien määrä 4:llä (maksimi pylväsmäärällä), jotta menisi kutakuikin tasan columneissa
        var numberItemsInColumn = Math.floor(gridElementLista.length/4);
        
        var columns = chunkArray(gridElementLista, numberItemsInColumn)

      /*****************************
        Se mitä spämmätään html:llään
      *****************************/

      var tulokset = ["", "", "", ""]

      for (var x = 0; x < columns.length; x++) {
        for (var k = 0; k < columns[x].length; k++) {

          //The exact location of GridElement
          var y = columns[x][k]
          tulokset[x] +=  "<div id='" + y.kuva + "' class='gridElement'>" +
                            "<img class='picture' src=" + y.kuva + ">" +
                            "<div class='banner'>" +
                              "<a class='bannerElement heartbtn' onclick='tykkaaSydan(" + y.ID + ")' type='button'>" +
                                "<img id='" + y.ID + "heart' src='heart-regular.svg'>" +
                              "</a>" +
                              "<p id='" + y.ID + "likes' class='bannerElement likes'>" + y.tykkaykset + "</p>" +
                              "<a class='bannerElement sharebtn' onclick='jaaKuvaSomessa(" + y.ID + ")' type='button'>" +
                                "<img src='share-square-solid.svg'>" + 
                              "</a>" +
                            "</div>" +
                          "</div>"
        }
      } 

      /*************************************
        Modal Login form (Third Party Code)
        "https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_login_form_modal"
      *************************************/
      // Get the modal
      var modal2 = document.getElementById('id02');
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal2) {
          modal2.style.display = "none";
        }
      }

        document.getElementById('column1').innerHTML = tulokset[0];
        document.getElementById('column2').innerHTML = tulokset[1];
        document.getElementById('column3').innerHTML = tulokset[2];
        document.getElementById('column4').innerHTML = tulokset[3];


    }

  /*****************************
    Muut funktiot
  *****************************/

    //Random funkito välitlä min - max
      function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      function uusiKayttaja() {
        kayttaja = new Kayttaja(document.getElementById('nimi').value)
        kayttaja.meili = document.getElementById('meili').value
        kayttaja.kuva = document.getElementById('uploadimg').src
        julkaisuKuvat.push(kayttaja.kuva)
      }


var kuvaindeksi
      function vaihdaKuva() {
        //Valitsee satunnaisen kuvan valmiista kuvapankista
        kuvaindeksi = getRndInteger(0, kuvapankki.length);
        var randomPicture = kuvapankki[kuvaindeksi];
        document.getElementById('uploadimg').src = randomPicture;
        document.getElementById('uploadimg').style.width = '100%';
      }

      // ###################
      // ###################
      // lähettää kuvan, ja lisää vastaavan GridElementin tietoineen GridElementListaan
      // ###################
      // ###################

      function lahetaKuva() {
        var uusiGridElement = new gridElement(kuvapankki[kuvaindeksi])
        uusiGridElement.tykkaykset = 0
        uusiGridElement.ID = gridElementLista.lenght
        uusiGridElement.viesti = document.getElementById("nimi").value;
        uusiGridElement.email = document.getElementById("meili").value;
        gridElementLista.push(uusiGridElement)
          
        localStorage.setItem('gridElementLista', JSON.stringify(gridElementLista))
        console.log(localStorage.getItem('gridElementLista'))
        console.log("Kuva lisatty listaan gridElementLista ja paivitetty LocalStorageen");
        console.log(gridElementLista);

        //resettaa lähetyslomakkeen arvot
        document.getElementById("nimi").value = ""
        uusiGridElement.email = document.getElementById("meili").value = ""
        kuvaindeksi = getRndInteger(0, kuvapankki.length)
      }


      function tykkaaSydan(id) {
        //Tyhjä sydän -> täysi sydän -> tyhjä sydän...
        //Lisää tykkäyksen määrää numerona
        var image = document.getElementById(id + 'heart');
        var numbr = document.getElementById(id + 'likes');
        var nextNumbr = gridElementLista[id].tykkaykset;

        if (image.src.match("heart-regular.svg")) {
          image.src = "heart-solid.svg";
          gridElementLista[id].tykkaykset++;
          nextNumbr++;
        } else {
          image.src = "heart-regular.svg";
          gridElementLista[id].tykkaykset--;
          nextNumbr--;
        }

          document.getElementById(id + 'likes').innerHTML = nextNumbr

          // päivittää tykkäyksen JSONiin
          localStorage.setItem('gridElementLista', JSON.stringify(gridElementLista))


      }


       // console.log(gridElementLista)
        // console.log(JSON.stringify(gridElementLista))

      function jaaKuvaSomessa(id) {
        document.getElementById('id02').style.display = 'block'
        document.getElementById('centeredImage').src = gridElementLista[id].kuva
 
      }

  /*************************************
    Navigation Bar DropDown menu
  *************************************/

    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function dropDownFunction() {
      document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }

    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function barDropDownFunction() {
      document.getElementById("barmyDropdown").classList.toggle("barshow");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
      if (!event.target.matches('.bardropbtn')) {
        var dropdowns = document.getElementsByClassName("bardropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('barshow')) {
            openDropdown.classList.remove('barshow');
          }
        }
      }
    }

  /*************************************
    Modal Login form (Third Party Code)
    "https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_login_form_modal"
  *************************************/

  // Get the modal
  var modal = document.getElementById('id01');

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

function tyhjenna(){
    localStorage.clear()
  console.log("LocalStorage tyhjennetty")
}

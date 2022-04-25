const sites = Vue.createApp({
    data() {
      return {
        ed: false,
        labels: true,
        iname: null,
        iurl: null,
        iicon: "" ,
        itype: null,
        bookmarks: [],
        types: []
      }      
    },
    methods: {
        setMem(){           
            if (this.bookmarks[0])localStorage.setItem('books', JSON.stringify(this.bookmarks))
            localStorage.setItem('lb', this.labels);
        },
        readMem(){    
            if (localStorage.getItem('books')){
                this.labels=JSON.parse(localStorage.getItem('lb'))      
                x = localStorage.getItem('books')
                this.bookmarks=JSON.parse(x)
                this.chechTypes()
            }else{
                this.ed=true
            }            
        },
        add(){
            if (this.iname && this.iurl ){
                let obj = {
                    "name":this.iname,
                    "url":this.iurl,
                    "icon":this.iicon,
                    "type":this.itype
                }                
                this.bookmarks.push(obj)
                this.chechTypes()
            }
        },
        tgl(){
            this.labels=!this.labels
        },
        deletes(what){            
            for(i = 0; i<this.bookmarks.length;i++){
                if (this.bookmarks[i].url==what) {
                    this.bookmarks.splice(i, 1)
                    break
                }
            }           
        },
        edit(){
            this.ed=!this.ed
            if (!this.ed) {
                this.setMem()
            }
            this.readMem()
        },
        openSite(vurl){
            if(!this.ed) window.open(vurl, '_blank').focus();
            console.log(vurl)
        },
        chechTypes(){            
            arr=[]
            for (i=0; i<this.bookmarks.length; i++){
                if(arr.includes(this.bookmarks[i].type)==false){                    
                    arr.push(this.bookmarks[i].type)
                }                
            }            
            this.types=arr                           
        }
    },
    beforeMount(){
        this.readMem()      
     },
  })

sites.mount('#data')
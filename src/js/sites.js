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
        types: [],
        addSite: "Add site",
        bx: null,
        disabled: false
      }      
    },
    methods: {
        clr(){
            this.iname= ""
            this.iurl= ""
            this.iicon= "" 
            this.itype= ""
            this.addSite="Add site"
            this.disabled= false
        },        
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
            if(this.addSite=="Update site"){
                this.bookmarks[this.bx].type=this.itype
                this.bookmarks[this.bx].name=this.iname
                this.bookmarks[this.bx].icon=this.iicon
                // console.log(this.bookmarks, this.bx)
                this.chechTypes()
            }else{
                if (this.iurl ){
                    if(!this.iname){
                        nohttp=this.iurl.split("://")[1]
                        if(nohttp.split(".")[0]=="www")title=this.iname.split(".")[1]
                        else this.iname = nohttp.split(".")[0]
                    }
                    // if(!this.iicon){
                    //     short=this.iurl.split("/")
                    // }
                    let obj = {
                        "name":this.iname,
                        "url":this.iurl,
                        "icon":this.iicon,
                        "type":this.itype
                    }                
                    this.bookmarks.push(obj)
                    this.chechTypes()
                }
            }
        },
        tgl(){
            this.labels=!this.labels
        },openSite(vurl, bookmarksIndex){
            if(!this.ed) window.open(vurl, '_blank').focus();
            else {
                this.addSite="Update site"
                this.bx=bookmarksIndex
                this.iurl = vurl
                this.iicon = this.bookmarks[this.bx].icon
                this.iname = this.bookmarks[this.bx].name
                this.itype = this.bookmarks[this.bx].type
                // console.log(this.bx)
                this.disabled=true
            }
        },
        deletes(bookmarksIndex){
            setTimeout(() => {
                this.bookmarks.splice(bookmarksIndex, 1) 
                this.addSite= "Add site",        
                this.disabled= false
            }, 20)  
        },        
        edit(){
            this.ed=!this.ed
            if (!this.ed) {
                this.setMem()
            }
            this.readMem()
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
window.onload = init;

function init() {
    new Vue({
        el: '#app',
        data: {
            Restaurants: [],
            RestaurantsCount: 0,
            PageSize: 10,
            LastPageSize: 10,
            PageNo: 1,

            _id: "",
            cuisine: "",
            name: "",
            count:0


        },
        mounted() {
            console.log("--- MOUNTED, appelée avant le rendu de la vue ---");
            this.getRestaurants();
            this.countRestaurants();
        },
        methods: {
            getRestaurants: function () {
                PageNoAdapter = this.PageNo -1;
                let url = "http://localhost:8080/api/restaurants?name=" + this.name+ "&page="+PageNoAdapter + "&pagesize="+this.PageSize;
                fetch(url).then((data) => {
                    console.log("method: getRestaurants SUCCESS.");
                    return data.json();
                }).then((dataEnJavaScript) => {
                    this.Restaurants = dataEnJavaScript.data;
                    this.count = dataEnJavaScript.count;
                });
            },

            countRestaurants: function () {
                let url = "http://localhost:8080/api/restaurants/count";
                fetch(url).then((data) => {
                    console.log("method: countRestaurants SUCCESS.");
                    return data.json();
                }).then((dataEnJavaScript) => {
                    this.RestaurantsCount = dataEnJavaScript.data;
                });
            },

            resetApp: function(){
                event.preventDefault();
                this.PageSize=10;
                this.LastPageSize=10;
                this.PageNo=1;
                this._id="";
                this.cuisine="";
                this.name="";
                this.getRestaurants();
                this.countRestaurants();
            },

            EditRestaurantRequest: function (r) {
                this._id = r._id;
                this.cuisine = r.cuisine;
                this.name = r.name;

                // Get the modal
                var modal = document.getElementById('myModal');

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                // When the user clicks on the button, open the modal 

                modal.style.display = "block";
                // When the user clicks on <span> (x), close the modal

                span.onclick = function () {
                    modal.style.display = "none";
                }

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }

            },

            ConfirmEditRestaurantRequest: function (event) {
                event.preventDefault();
                var modal = document.getElementById('myModal');
                modal.style.display = "none";
                let donneesFormulaire = new FormData(event.target);
                id = this._id;
                console.log("methode: ConfirmEditRestaruant id: " + id);
                let url = "http://localhost:8080/api/restaurants/" + id;
                fetch(url, {
                    method: "PUT",
                    body: donneesFormulaire
                }).then(data => {
                    console.log("method: ConfirmEditRestaurantRequest SUCCESS.")
                    return data.json();
                }).then((dataEnJavaScript) => {
                    this.name = "";
                    this.cuisine = "";
                    this.getRestaurants();
                });
            },

            AddRestaurantRequest: function (event) {
                event.preventDefault();
                let form = event.target;
                let donneesFormulaire = new FormData(event.target);
                console.log("Methode: AddRestaurantRequest name: " + form.nom.value + " cuisine: " + form.cuisine.value);
                let url = "http://localhost:8080/api/restaurants/";
                fetch(url, {
                    method: "POST",
                    body: donneesFormulaire
                }).then(data => {
                    console.log("method: AddRestaurantRequest SUCCESS.")
                    return data.json();
                }).then((dataEnJavaScript) => {
                    this.getRestaurants();
                    this.countRestaurants();
                    this.cuisine = form.cuisine.value;
                    this.name = form.nom.value;
                });
            },

            SearchRestaurantRequest: function (event) {
                event.preventDefault();
                /*
                if (this.nameSearch==="") {
                    console.log("Warning: (name) is required in SearchRestaurantRequest method.")
                    return;
                }
                */
                console.log("Search Restaurant, (name: " + this.name + ")");
                this.PageNo = 1;
                PageNoAdapter = this.PageNo -1;
                let url = "http://localhost:8080/api/restaurants?name=" + this.name + "&page="+PageNoAdapter;
                fetch(url).then((data) => {
                    console.log("method: getRestaurants SUCCESS.");
                    return data.json();
                }).then((dataEnJavaScript) => {
                    this.Restaurants = dataEnJavaScript.data;
                    this.count = dataEnJavaScript.count;
                    /*
                    info = document.querySelector("#info");
                    let info_ = document.createTextNode("Nombre de restaurants pour votre recherche ");
                    document.info.append(info_);
                    */
                    console.log("count search: "+this.count);
                });

            },

            RemoveRestaurantRequest: function (r) {
                event.preventDefault();
                let url = "http://localhost:8080/api/restaurants/" + r._id;
                fetch(url, {
                    method: "DELETE",
                }).then(data => {
                    console.log("method: RemoveRestaurantRequest SUCCESS.")
                    return data.json();
                }).then((dataEnJavaScript) => {
                    this.getRestaurants();
                    this.countRestaurants();
                });
                console.log("Methode: RemoveRestaurantRequest id: " + r._id);
            },

            pageSizeSignal: function (event) {
                this.LastPageSize = this.PageSize;
                this.PageSize = event.target.value;
                console.log("method: pageSignal, current PageSize: " + this.PageSize + " Last PageSize: " + this.LastPageSize);

                let index = this.LastPageSize * this.PageNo;
                this.PageNo = Math.floor(index / this.PageSize);
                if (this.PageNo == 0) this.PageNo = 1;
                PageNoAdapter = this.PageNo -1;
                let url = "http://localhost:8080/api/restaurants?pagesize=" + this.PageSize + "&page=" + PageNoAdapter + "&name=" + this.name;
                fetch(url).then(data => {
                    console.log("method: getRestaurants SUCCESS.")
                    return data.json();
                }).then((dataEnJavaScript) => {
                    this.Restaurants = dataEnJavaScript.data;
                });
            },

            previousPageSignal: function () {
                if (this.PageNo > 1) {
                    this.PageNo--;
                    PageNoAdapter = this.PageNo -1;
                    console.log("method: previousPageSignal, PageNo: " + this.PageNo);
                    let url = "http://localhost:8080/api/restaurants?pagesize=" + this.PageSize + "&page=" + this.PagaNoAdapter + "&name=" + this.name;
                    fetch(url).then(data => {
                        console.log("method: getRestaurants SUCCESS.")
                        return data.json();
                    }).then((dataEnJavaScript) => {
                        this.Restaurants = dataEnJavaScript.data;
                    });
                }
            },

            nextPageSignal: function () {
                if ((this.PageNo * this.PageSize) < this.count) {
                    this.PageNo++;
                    PageNoAdapter = this.PageNo -1;
                    console.log("method: previousPageSignal, PageNo: " + this.PageNo);
                    let url = "http://localhost:8080/api/restaurants?pagesize=" + this.PageSize + "&page=" + PageNoAdapter + "&name=" + this.name;
                    fetch(url).then(data => {
                        console.log("method: getRestaurants SUCCESS.")
                        return data.json();
                    }).then((dataEnJavaScript) => {
                        this.Restaurants = dataEnJavaScript.data;
                    });
                }

            }

        }
    })
}


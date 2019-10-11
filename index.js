$("#searchButton").on("click", function (event) {
    const userName = $("#searchBox").val();

    const url = "https://api.mojang.com/users/profiles/minecraft/" + userName;
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    const request = new XMLHttpRequest();

    request.open("GET", proxyUrl + url, true);
    request.send(null);

    $(".id-status-card").attr("hidden", "");

    showLoading();

    request.onload = function () {
        hideLoading();

        try {
            const data = JSON.parse(this.response);
            showNameHasBeenUsed();
        } catch (e) {
            showNameIsAvailable();
        }

        function showNameIsAvailable() {
            $(".id-status-card-available").removeAttr("hidden");
        }

        function showNameHasBeenUsed() {
            $(".id-status-card-unavailable").removeAttr("hidden");
        }
    };


    function showLoading() {
        $(".loader").removeAttr("hidden");
    }

    function hideLoading() {
        $(".loader").attr("hidden","");
    }
});
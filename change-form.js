$("#go-register").on("click", function(e) {
    e.preventDefault();
    $("#sign-in-form").css('display','none');
    $("#register-form").css('display','block');
});
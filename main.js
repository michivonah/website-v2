      // Loading
      window.addEventListener('load', () => {
        document.getElementById('scroll-top').style.display = "none";
        // check if site is released
        //var timeToRelease = new Date('August 7, 2022 12:00:00').getTime() - new Date().getTime();
        //if(timeToRelease > 0 && window.location.hostname == 'michivonah.ch') window.location = "https://michivonah.ch/countdown.html";
        age(16, 9, 2005);
        toggleSocialmedia();
        // Check cookie banner
        //localStorage.removeItem('cookies');
        if(localStorage.getItem('cookies') != null){
          document.getElementById('cookieBanner').style.display = "none";
        }
        // random home img
        randomHomeImg();
        AOS.init({disable: 'mobile'});
        //AOS.init({disable: true});
        // hide loadingscreen
        document.getElementById('loadingScreen').style.display = "none";
      });

      document.getElementById('scroll-top').addEventListener("click", function(){
        scrollToTop();
      });

      function scrollToTop(){
        window.scroll(0, 0);
      }

      function scrollDown(){
        window.scroll(0, window.innerHeight - 56);
      }

      function toggleSection(sectionName, type){
        var section = document.getElementById(sectionName);
        if(section.style.display == "block" || section.style.display == "flex"){
          section.style.display = "none";
        }
        else{
          section.style.display = type;
        }
      }


      function toggleClass(className){
        var elements = document.getElementsByClassName(className);
        for(var i = 0; i < elements.length; i++){
          if(elements[i].style.display == "block"){
            elements[i].style.display = "none";
          }
          else{
            elements[i].style.display = "block";
          }
        }
      }

      function closeNavbar(){
        if(document.getElementById('closeNavbarPlaceholder').style.display == "block"){
          document.getElementById("navbar-links").style.display = "none";
          document.getElementById("closeNavbarPlaceholder").style.display = "none";
        }
      }

      function toggleSocialmedia(){
        var tabs = document.getElementsByClassName('socialTab');
        for(var i = 0; i < tabs.length; i++){
          var currentTabId = tabs[i].id;
          var currentRadioButton = currentTabId.replace("social", "sm");;
          var state = document.getElementById(currentRadioButton).checked;
          if(state == true) document.getElementById(tabs[i].id).style.display = "block";
          else document.getElementById(tabs[i].id).style.display = "none";
        }
      }

      function toggleQuestion(){
        if(event.target.tagName == "DIV"){
          if(event.target.getElementsByTagName('p')[0].style.display == "none"){
            event.target.getElementsByTagName('p')[0].style.display = "block";
            event.target.getElementsByTagName('i')[0].style.transform = "rotate(180deg)";
          }
          else{
            event.target.getElementsByTagName('p')[0].style.display = "none";
            event.target.getElementsByTagName('i')[0].style.transform = "rotate(0deg)";
          }
        }
        else if(event.target.tagName == "H3" || event.target.tagName == "I"){
          if(event.target.parentElement.getElementsByTagName('p')[0].style.display == "none"){
            event.target.parentElement.getElementsByTagName('p')[0].style.display = "block";
            event.target.parentElement.getElementsByTagName('i')[0].style.transform = "rotate(180deg)";
          }
          else{
            event.target.parentElement.getElementsByTagName('p')[0].style.display = "none";
            event.target.parentElement.getElementsByTagName('i')[0].style.transform = "rotate(0deg)";
          }
        }
        else console.log("An error occurred while opening this section. Element: {0}", event.target);
      }

      function checkForm(){
        console.log();
        var requiredFields = ['surname-field', 'lastname-field', 'email-field', 'message-text', 'terms'];
        var errorCount = 0;
        for(var i = 0; i < requiredFields.length; i++){
          var currentElement = document.getElementById(requiredFields[i]);
          currentElement.style.animation = null;
          if(currentElement.checkValidity() == true){
            currentElement.style.background = "var(--theme1)";
            currentElement.style.animation = null;
          }
          else{
            currentElement.classList.add("animate");
            currentElement.style.background = "var(--red)";
            currentElement.style.animation = "shake 250ms ease";
            currentElement.classList.remove("animate");
            errorCount++;
          }
        }
        if(document.getElementById('honeypot').checked === true) errorCount++;
        if(errorCount <= 0){
          var name = document.getElementById('surname-field').value + " " + document.getElementById('lastname-field').value;
          sendWhatsapp(name, document.getElementById('email-field').value, document.getElementById('subject-field').value, document.getElementById('message-text').value);
          //document.getElementById("contact-form").submit();
        }
      }

      function useCookie(usersChoice){
        let cookieBanner = document.getElementById('cookieBanner');
        cookieBanner.style.display = "none";
        if(usersChoice == true){
          localStorage.setItem('cookies', true);
        }
        else{
          localStorage.setItem('cookies', false);
        }
      }

      function showQrcode(src, imgId, old){
        // src = 'assets/socialmedia/insta-code.png'
        // old = assets/socialmedia/michi_pb.jpeg
        // img = document.getElementById('insta1Img')
        var src = "https://api.qrserver.com/v1/create-qr-code/?size=900x900&format=png&margin=0&data=http://insta.michivonah.ch/";
        var image = document.getElementById(imgId).src;
        if(image != src) document.getElementById(imgId).src = src;
        else document.getElementById(imgId).src = old;
      }

      function sendWhatsapp(name, mail, subject, text){
        var mail = mail.replaceAll('@', '%40');
        var subject = subject.replaceAll(' ', '%20');
        var text = text.replaceAll(' ', '%20');
        var text = text.replaceAll('?', '%3F');
        var text = text.replaceAll('!', '%21');
        var whatsappUrl = "https://wa.me/41782471516?text=Name%3A%20" + name + "%0AE-Mail%3A%20" + mail + "%0ASubject%3A%20" + subject + "%0AMessage%3A%20" + text;
        window.open(whatsappUrl);
      }

      function randomHomeImg(){
        var homeImg = document.getElementById('homeImg');
        var num = Math.floor(Math.random() * (4 - 1) + 1);
        homeImg.src = "assets/bitmojis/home_" + num + ".png";
      }

      function age(birthday, birthmonth, birthyear){
        var birthmonth = birthmonth - 1;
        var ageText = document.getElementById('age');
        var date = new Date();
        var year = date.getFullYear();
        if(date.getMonth() == birthmonth){
          if(date.getDate() >= birthday){
            ageText.innerHTML = Number(year) - birthyear;
          }
          else{
            ageText.innerHTML = Number(year) - birthyear - 1;
          }
        }
        else if(date.getMonth() >= birthmonth){
          ageText.innerHTML = Number(year) - birthyear;
        }
        else if(date.getMonth() <= birthmonth){
          ageText.innerHTML = Number(year) - birthyear - 1;
        }
      }

      window.addEventListener('scroll', function(e) {
        var navbar = document.getElementById('navbar');
        var scrollTop = document.getElementById('scroll-top');
        if(this.scrollY > 20){
          navbar.style.background = "var(--theme1)";
          navbar.style.color = "#fff";
          scrollTop.style.display = "flex";
        }
        else{
          if(window.innerWidth <= 640){
            if(document.getElementById('navbar-links').style.display == "block"){
              navbar.style.background = "var(--theme1)";
              scrollTop.style.display = "none";
            }
            else{
              navbar.style.background = "transparent";
              scrollTop.style.display = "none";
            }
          }
          else{
            navbar.style.background = "transparent";
            scrollTop.style.display = "none";
          }
        }
      });
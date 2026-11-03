class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` `;
  }
  }



  class SiteHeader extends HTMLElement{
  connectedCallback(){
 // Replace this with your actual footer HTML
    this.innerHTML =` 
    <footer id="klan" class="lower">
    <div class="container">
        <div class="content">
            <div class="contentone">
                <div class="image">
                    <figure>
                        <a href="index.html"><img src="HOME/IMAGE/r-klan-1.png" alt="R-klan" class="img"></a>
                    </figure>
                    <figure>
                        <div class="image-1">
                            <a href=""><img src="HOME/IMAGE/facebook.png" alt="facebook" class="your"></a>
                            <a href=""><img src="HOME/IMAGE/insta.png" alt="insta" class="your"></a>
                            <a href=""><img src="HOME/IMAGE/i.n.png" alt="i.n" class="your"></a>
                        </div>
                    </figure>
                </div>
                <div class="text">
                    <nav>
                    <ul>
                        <li><a href="index.html">HOME</a></li>
                        <li><a href="about.html">About Our Cause</a></li>
                        <li><a href="review.html">Review</a></li>
                        <li><a href="content.html">Content</a></li>
                    </ul>
                    </nav>
                </div>
                <div class="textcall">
                    
                       <p> Address will come here </b>
                        Address will come here</p>
                    
                    <p><b>(123) 456-7890</b></p>
                    <p>info@r-klan.com</p>
                </div>
            </div>
            <div class="content2">
                <p>© 2026 R-Klan. All Rights Reserved</p>
            </div>
        </div>
    </div>
</footer>
`;
}
}

// Define the custom tags
customElements.define("site-header", SiteHeader);     
customElements.define("site-footer", SiteHeader);     
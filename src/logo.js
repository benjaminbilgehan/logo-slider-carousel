var carouselData = [{
	"customerName":"Customer Name1",
	"titleText":"Customer Title1",
	"linkText":"Watch video",
	"linkUrl":"/#",
	"logoAltText":"Logo Alt Text",
	"logoUrl":"http://placehold.it/200x101/0000FF"
},
			    {
	"customerName":"Customer Name2",
	"titleText":"Customer Title2",
	"linkText":"Watch video",
	"linkUrl":"/#",
	"logoAltText":"Logo Alt Text",
	"logoUrl":"http://placehold.it/200x101/FF0000"
},
			    {
	"customerName":"Customer Name3",
	"titleText":"Customer Title3",
	"linkText":"Watch video",
	"linkUrl":"/#",
	"logoAltText":"Logo Alt Text",
	"logoUrl":"http://placehold.it/200x101/0000FF"
},
			  
			    {
	"customerName":"Customer Name2",
	"titleText":"Customer Title2",
	"linkText":"Watch video",
	"linkUrl":"/#",
	"logoAltText":"Logo Alt Text",
	"logoUrl":"http://placehold.it/200x101/FF0000"
},
			    {
	"customerName":"Customer Name3",
	"titleText":"Customer Title3",
	"linkText":"Watch video",
	"linkUrl":"/#",
	"logoAltText":"Logo Alt Text",
	"logoUrl":"http://placehold.it/200x101/0000FF"
}
			   ];

const logoCarousel = new Vue({
	el: ".logo-carousel",
	data: {
		slideCount: carouselData.length,
		activeSlide: 0,
		slides: carouselData.slice(0),
		noAnim: false,
		transitionComplete: true,
		imgWidth: 0,
		carouselClass: "",
		slideOffset: 6
	},
	mounted: function(){
		let slideDataClone = this.slides.slice(0);
		
		this.slides.push(...slideDataClone);
		this.slides.unshift(...slideDataClone);
		
		this.$refs.track.addEventListener("transitionend", this.transitionCompleted, true);   
		this.$refs.track.addEventListener("webkitTransitionEnd", this.transitionCompleted, true);    
		this.$refs.track.addEventListener("oTransitionEnd", this.transitionCompleted, true);    
		this.$refs.track.addEventListener("MSTransitionEnd", this.transitionCompleted, true);
		
		this.$nextTick(()=>{
			this.setImgWidth();
		});
		
		window.addEventListener("resize", ()=>{
			this.setImgWidth();
		});
		
		switch(this.slideCount) {
			case 3:
				this.carouselClass = "carousel-customer-logos--three-logos"
				this.slideOffset = 3;
				break;
			case 5:
				this.carouselClass = "carousel-customer-logos--five-logos"
				this.slideOffset = 6;
				break;
			default:
				this.carouselClass = "carousel-customer-logos--five-logos"
		}
	},
	methods: {
		clickLogo(index) {
			if (this.transitionComplete){
				this.noAnim = false;
				
				this.transitionComplete = false;
				this.activeSlide = (index - this.slideOffset - 1);
			}
		},
		next(){
			if (this.transitionComplete){
				this.noAnim = false;
				
				this.transitionComplete = false;
				this.activeSlide = this.activeSlide + 1;
			}
		},
		prev(){
			if (this.transitionComplete){
				this.noAnim = false;
				
				this.transitionComplete = false;
				this.activeSlide = this.activeSlide - 1;
			}
		},
		shouldAnim(){
			if(this.noAnim && this.transitionComplete) {
				return 'transition: none !important';
			} else {
				return '';
			}
		},
		offsetCalc() {
			let offsetVal = 100 / this.slideCount;
			
			if(this.noAnim) {
				return `transition: none !important; transform: translate3d(-${100 + (offsetVal * this.activeSlide)}%, 0, 0)`;
			} else {
				return `transition: .5s ease-in-out all; transform: translate3d(-${100 + (offsetVal * this.activeSlide)}%, 0, 0)`
			}
		},
		transitionCompleted(e) {
			console.log(this.activeSlide);
			if (e.propertyName != "transform"){
				return;
			}
			if (this.activeSlide >= (this.slideCount - 1) || this.activeSlide <= (-this.slideCount + 1)) {
				this.noAnim = true;
				let additionalOffset = this.slideCount == 3 ? 0 : 1;
				
				if (this.activeSlide < 0){
					this.activeSlide = this.activeSlide + (this.slideOffset - additionalOffset);
				} else {
					this.activeSlide = this.activeSlide - (this.slideOffset - additionalOffset);
				}
			}
			this.transitionComplete = true;
		},
		setImgWidth(){
			this.imgWidth = (this.$refs.track.clientWidth / this.slideCount) - 40 +'px';
		}
	}
});
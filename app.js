  /**
   * React Carousel components
   * method return rendered carousel
   */
  var Slide = React.createClass({
      getInitialState: function() {
        return {
            selected: this.props.status
        }
      },
      componentWillReceiveProps: function(prop) {
        console.dir(prop.status);
        this.setState({
            selected: prop.status
        });
      },
      render: function() {
        var curStatus = "",
          _this = this,
          items = this.props.list[0].items.map(function(item, i) {
            (i===_this.state.selected)?(curStatus ="activeSlide"):(curStatus ="");
            return (
              <div className= {"item "+curStatus} key={i}>
                <img src={item.prodImgSrc} alt="..." />
                <div className="carousel-caption">
                  {item.prodName}
                </div>
             </div>
            )
          });
        return  <div className="carousel-inner" role="listbox">{items}</div>
      }
  });


  var Carousel = React.createClass({
    clickHandler: function(e) {
      var nodes = Array.prototype.slice.call(e.currentTarget.children),
          index = nodes.indexOf(e.target);

      this.setState({
          selected: index
      });
    },
    changeSlide:function(){
      var slideCount = (this.props.list[0].items.length)-1,
          _this = this;

      if(this.state.selected < (slideCount)){
        this.setState({
          selected: parseInt(_this.state.selected)+1
        });
      }
      else{
        this.setState({
          selected: parseInt(_this.state.selected)-parseInt(slideCount)
        });
      }
    },

    getInitialState: function() {
      return {
        selected: this.props.list[0].activeSlide
      }
    },
    componentWillMount: function() {
      this.setState({
        productlist: this.props.list
      });
    },
    componentDidMount: function () {
      setInterval(this.changeSlide, 5000)
    },

    render: function(){
      var _this =this,
        indicators = this.props.list[0].items.map(function(child,i){
          if(i===_this.state.selected){
           return <li className={'active'} key={i} ></li>
          }else{
           return <li className={""} key={i} ></li>
          }
        });
        return <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                 <ol className="carousel-indicators" onClick={_this.clickHandler}>{indicators}</ol>
                 <Slide list={this.state.productlist} status={this.state.selected} />
               </div>
    }
  });

  ReactDOM.render( < Carousel list = {
  [{
      activeSlide: 0,
      items: [{
          prodImgSrc: "img/fullimage1.jpg",
          prodName: "Slide One"

      }, {
          prodImgSrc: "img/fullimage2.jpg",
          prodName: "Slide Two"
      }, {
          prodImgSrc: "img/fullimage3.jpg",
          prodName: "Slide Three"
      }, {
          prodImgSrc: "img/fullimage4.jpg",
          prodName: "Slide four"
      }, ]
  }]
  }/>,document.getElementById('carousel'));

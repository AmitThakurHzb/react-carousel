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
            (i===_this.state.selected)?(curStatus ="active"):(curStatus ="");
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
          prodImgSrc: "http://i.huffpost.com/gen/1448231/images/n-WORK-CLOTHES-large570.jpg",
          prodName: "Slide One"

      }, {
          prodImgSrc: "http://images.medicaldaily.com/sites/medicaldaily.com/files/styles/full_breakpoints_theme_medicaldaily_desktop_1x/public/2015/07/05/nature.jpg",
          prodName: "Slide Two"
      }, {
          prodImgSrc: "http://i.huffpost.com/gen/1448231/images/n-WORK-CLOTHES-large570.jpg",
          prodName: "Slide Three"
      }, {
          prodImgSrc: "http://images.medicaldaily.com/sites/medicaldaily.com/files/styles/full_breakpoints_theme_medicaldaily_desktop_1x/public/2015/07/05/nature.jpg",
          prodName: "Slide four"
      }, ]
  }]
  }/>,document.getElementById('carousel'));

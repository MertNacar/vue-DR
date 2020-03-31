/**
 * Owl Carousel v1 Thumbnails
 * v0.1
 */

var OwlThumbs = {};

// Owl Thumbnail Internals
OwlThumbs.Internals = {
  // Preferences
  prefs: {
    // Get tag type to be used to wrap around thumbnails
    tagType: function(options){
      var tagType = '<a />';

      // Set tagType from config
      if (options.hasOwnProperty('thumbnailTagWrap') && !!options.thumbnailTagWrap.length) {
        if (options.thumbnailTagWrap.indexOf('<') == 0 && 
            options.thumbnailTagWrap.indexOf('/>') == options.thumbnailTagWrap.length - 2) {
          tagType = options.thumbnailTagWrap;
        }
        else {
          tagType = '<' + options.thumbnailTagWrap + ' />';
        }
      }

      return tagType;
    },
    // Determine tab size for thumbnails
    tabSize: function(elem, tabSizeProperty, tabPadProperty){
      var size = 0;
      elem.find(".owl-page").each(function(){
        size += $(this)[tabSizeProperty]();
        // @TODO account for non pixel sizes
        size += parseInt($(this).css(tabPadProperty), 10);
      });
      return size;
    },
    // Determine whether scroller for tab display is visible
    tabScrollShouldBeVisible: function(props){
      return (props.ts > props.delta);        
    },
  },
  // Thumbnails
  thumbnails: {
    // Generate a thumbnail
    generate: function(params){
      var link = $(params.tagType, {
        'class': 'item-link',
        tabIndex: 0,
        'title': 'Page number ' + (params.index + 1)
      });
      link.append(params.content).bind('click', function(e){
        e.preventDefault();
      }).bind('keyup', function(e){
        e.preventDefault();
        if (e.which == 13) {
          $(e.target).trigger('mouseup');
        }
      });
      if (params.tagType != '<a />') {
        // Restore link events
        link.find('a').bind('click touchend', function(e){
          e.preventDefault();
          e.stopPropagation();
          window.location.href = this.href;
        });
      }
      return link;
    }
  },
  // Actions and events to perform
  actions: {
    // Scroll the thumbnail list to the active thumbnail
    scrollToThumb: function(activeThumb, slideSpeed) {
      var paginator = activeThumb.closest('.owl-pagination');

      var thumbTop = activeThumb.offset().top,
      containerTop = paginator.offset().top,
      containerScrollTop = paginator.scrollTop(),
      thumbLeft = activeThumb.offset().left,
      containerLeft = paginator.offset().left,
      containerScrollLeft = paginator.scrollLeft(),

      containerPadTop = parseInt(paginator.css('paddingTop'), 10),
      containerPadLeft = parseInt(paginator.css('paddingLeft'), 10);

      activeThumb.closest('.owl-pagination').animate({
        scrollTop: (containerScrollTop + (thumbTop - containerTop) - containerPadTop),
        scrollLeft: (containerScrollLeft + (thumbLeft - containerLeft) - containerPadLeft)
      }, slideSpeed);
    }
  }
};

// Owl Carousel Thumbnails Plugin
OwlThumbs.Plugin = new OwlPlugins.plugin({
  afterInit: [
    'init.thumbnails',
    'init.numbers'
  ],
  afterUpdate: [
    'init.thumbnails',
    'init.numbers'
  ],
  afterMove: 'update.thumbnails',
}, {
  init: {
    thumbnails: function(){
      if (this.options.thumbnailSelector) {
        var thumbnailSelector = this.options.thumbnailSelector,
        controlsGroup = $('.owl-controls', this.$elem),
        paginatorsLink = $('.owl-page', controlsGroup),
        isVertical = this.options.thumbnailsVertical,
        lastPage = this.itemsAmount - this.itemsAmount % this.options.items,
        tagType = OwlThumbs.Internals.prefs.tagType(this.options);

        $.each(this.owl.userItems, function (i) {
          var link = OwlThumbs.Internals.thumbnails.generate({
            tagType: tagType,
            content: $(this).find(thumbnailSelector).contents().clone(),
            index: i
          });
          $(paginatorsLink[i]).append(link);
        });

        var scrollProps = function(){
          var props = {};
          props.pagination      = $('.owl-pagination', controlsGroup),
          props.axis            = isVertical ? "y" : "x",
          props.propertyName    = props.axis == "x" ? "scrollLeft" : "scrollTop",
          props.tabSizeProperty = props.axis == "x" ? "width" : "height",
          props.tabPadProperty  = props.axis == "x" ? "marginLeft" : "marginTop",
          props.delta           = props.axis == "x" ? props.pagination.innerWidth() : props.pagination.innerHeight(),
          props.ts              = OwlThumbs.Internals.prefs.tabSize(props.pagination, props.tabSizeProperty, props.tabPadProperty);

          var tempProps = {
            delta: props.delta,
            ts:    props.ts
          };
          props.tabScrollVisible = OwlThumbs.Internals.prefs.tabScrollShouldBeVisible(tempProps);

          if (props.tabScrollVisible) {
            var remSize = controlsGroup.find(".owl-pages-prev, .owl-pages-next")[props.tabSizeProperty]();
            props.ts += remSize;
            props.ts += 8 * 2; // @TODO fix
          }

          return props;
        },
        scroll = function(direction){
          // Normalise direction
          if (direction > 0) direction = 1;
          if (direction < 0) direction = -1;

          var props = scrollProps();

          if (props.ts > props.delta) {
            var pos = props.pagination[props.propertyName]() + (props.delta * direction),
            animProps = {};
            if (pos < 0) pos = 0;
            animProps[props.propertyName] = pos;
            console.log(animProps);
            props.pagination.animate(animProps, "fast");
          }
        },
        scrollerDisplayCheck = function(){
          var props = scrollProps(),
          uiElems = controlsGroup.find(".owl-pages-prev, .owl-pages-next");
          if (props.tabScrollVisible) {
            uiElems.show();
          }
          else {
            uiElems.hide();
          }
        };

        if (!controlsGroup.find(".owl-pages-prev, .owl-pages-next").length) {
          var scrollControlBack = $('<a />', {
            href: "#",
            html: "<span>Scroll back through thumbnails</span>",
            "class": "owl-pages-prev"
          });
          scrollControlBack.bind('touchstart mousedown click', function(e){
            e.preventDefault();
          }).bind('touchend mouseup', function(e){
            e.preventDefault();
            scroll(-1);
          });
          controlsGroup.append(scrollControlBack);
        }

        if (!controlsGroup.find(".owl-pages-next").length) {
          var scrollControlFwd = $('<a />', {
            href: "#",
            html: "<span>Scroll forward through thumbnails</span>",
            "class": "owl-pages-next"
          });
          scrollControlFwd.bind('touchstart mousedown click', function(e){
            e.preventDefault();
          }).bind('touchend mouseup', function(e){
            e.preventDefault();
            scroll(1);
          });
          controlsGroup.append(scrollControlFwd);
        }

        scrollerDisplayCheck();

        $(window).resize(function(){
          scrollerDisplayCheck();
        });
      }
    },
    numbers: function(){
      if (!!this.options.paginationNumbers) {
        var controlsGroup = $('.owl-controls', this.$elem),
        paginatorsLink = $('.owl-page', controlsGroup);

        $.each(this.owl.userItems, function (i) {
          var pl = paginatorsLink[i];
          $(pl).attr({
            tabindex: "0",
            title: "Page number " + (i + 1)
          });
        });
      }
    }
  },
  update: {
    thumbnails: function(){
      if (this.options.thumbnailSelector) {
        var activeThumb = $('.owl-pagination .owl-page.active', this.$elem);
        OwlThumbs.Internals.actions.scrollToThumb(
          activeThumb,
          this.options.slideSpeed
        );
      }
    }
  }
});
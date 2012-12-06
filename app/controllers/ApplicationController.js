remoteTheme.ApplicationController = M.Controller.extend({

    cssFilename: '/pastebin/raw.php?i=',

    themeList: [],

    init: function( isFirstLoad ){
        this.loadRemoteTheme();
        //ZtaFw6es blue
        //WAzGskWw green
        //QME6LZdX red
        this.set('themeList', [{name: 'WAzGskWw'}, {name: 'QME6LZdX'}]);
    },

    loadRemoteTheme: function( themeShortcut ){

        var that = this;
        var ts = themeShortcut ? themeShortcut : 'WAzGskWw';
        var url = that.cssFilename + ts;

        M.Request.init({
            url: url,
            //method:obj.method,
            //isJSON:YES,
            //timeout:obj.timeout ? obj.timeout : null,
            //data:obj.data ? obj.data : null,
            //contentType:"application/json; charset=utf-8",
            beforeSend:function () {
                    M.LoaderView.show();
            },
            onSuccess:function (data, msg, xhr) {
                M.LoaderView.hide();
                var style = that.createStyle(data);
                that.removeStyle();
                that.appendStyle( style );
            },
            onError:function (xhr, msg, error) {
                M.LoaderView.hide();
            }
        }).send();

    },

    createStyle: function( data ){

        var css = data || 'h1 { background: red; }';
        var style = document.createElement('style');
        style.id = 'remote_theme';

        style.type = 'text/css';
        if(style.styleSheet){
            style.styleSheet.cssText = css;
        }else{
            style.appendChild(document.createTextNode(css));
        }

        return style;
    },

    appendStyle: function( style ){
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    },

    removeStyle: function( id ){
        var styleToRemove = document.getElementById(id || 'remote_theme');
        if(styleToRemove && styleToRemove.remove){
            styleToRemove.remove();
        }
    },

    changeTheme: function(id){
        var value = M.ViewManager.getViewById(id).getValue();
        this.loadRemoteTheme( value );
        this.appendValueToHistory(value);
    },

    appendValueToHistory: function( value ){
        this.themeList.push({
            name: value
        });
        this.set('themeList', this.themeList);
    },

    changeThemeFromList: function( id, value ){
        this.loadRemoteTheme( value );
    }
});

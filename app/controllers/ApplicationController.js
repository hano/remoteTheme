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

        var style = that.getFromLocaleStorage(ts);

        var onSuccess = function(data, msg, xhr){
            var style = that.createStyle(data);
            S = style;
            that.removeStyle();
            that.appendStyle( style );
            that.saveToLocaleStorage(ts, data);
        }

        if( style ){
            onSuccess( style );
        } else {

            M.Request.init({
                url: url,
                beforeSend:function () {
                    M.LoaderView.show();
                },
                onSuccess:function (data, msg, xhr) {
                    M.LoaderView.hide();
                    onSuccess(data, msg, xhr);
                },
                onError:function (xhr, msg, error) {
                    M.LoaderView.hide();
                }
            }).send();
        }

    },

    buildStorageKey: function( key ) {
        return M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + key;
    },

    saveToLocaleStorage: function(key, value){
        var k = this.buildStorageKey(key);
        localStorage.setItem(k, value);
    },

    getFromLocaleStorage: function( key ){

        var k = this.buildStorageKey( key );
        return localStorage.getItem( k );
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

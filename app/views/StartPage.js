// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: remoteTheme
// View: StartPage
// ==========================================================================

remoteTheme.StartPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
        pageshow: {
            target: remoteTheme.ApplicationController,
            action: 'init'
        }
    },
    
    cssClass: 'StartPage',

    childViews: 'header content footer',

    header: M.ToolbarView.design({
        value: 'HEADER',
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'themeField themeListView',

        themeField:M.TextFieldView.design({
            initialText: 'WAzGskWw',
            events:{
                change: {
                    target: remoteTheme.ApplicationController,
                    action: 'changeTheme'
                }
            }
        }),

        themeListView:M.ListView.design({
            contentBinding:{
                target: remoteTheme.ApplicationController,
                property: 'themeList'
            },
            idName: 'name',
            listItemTemplateView:M.ListItemView.design({
                childViews: 'name',
                events: {
                    tap: {
                        target: remoteTheme.ApplicationController,
                        action:'changeThemeFromList'
                    }
                },
                name: M.LabelView.design({
                    valuePattern: '<%= name %>'
                })
            })
        })
    }),

    footer: M.ToolbarView.design({
        value: 'FOOTER',
        anchorLocation: M.BOTTOM
    })

});


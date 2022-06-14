export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard/default',
        icon: 'dashboard',
    },
    {
        name: 'Admin',
        path: '/admin/roleMenu',
        icon: 'admin_panel_settings',
    },
    {
        name: 'Member Details',
        path: '/admin/userTree',
        icon: 'contact_mail',
    },
    {
        name: 'Subscription',
        path: '/Graph',
        icon: 'auto_graph_outlined',
    },
    {
        name: 'DhanReport',
        path: '/Download',
        icon: 'paid',
    },
    {
        name: 'CurrencyReport',
        path: '/Currency',
        icon: 'price_check',
    },
    {
        name: 'DhanType',
        path: '/DhanSwipe',
        icon: 'alt_route',
    },
    {
        name: 'SamugUser Details',
        path: '/UserLogin',
        icon: 'login',
    },
    {
        name: 'Accounts',
        icon: 'account_balance_wallet',
        subMenu: '1',
        menuUid: 'B',
        children: [
            {
                name: 'Payout',
                path: '/acc/payoutlist',
                iconText: 'B',
                menuId: '3',
            },
            {
                name: 'Payin',
                path: '/acc/payinList',
                iconText: 'E',
                menuId: '4',
            },
            {
                name: 'Bank KYC',
                path: '/acc/bankKycList',
                iconText: 'E',
                menuId: '5',
            },
        ],
    },
    //employee
    {
        name: 'Employee',
        icon: 'person_alt',
        subMenu: '1',
        menuUid: 'A',
        children: [
            {
                name: 'New Employee',
                path: '/emp/newEmp',
                //   iconText: "B",
                menuId: '1',
            },
            {
                name: 'Employee List',
                path: '/emp/empLst',
                //  iconText: "E",
                menuId: '2',
            },
        ],
    },
    //CouponsList
    {
        name: 'Coupon',
        icon: 'discount',
      //  subMenu: '1',
       // menuUid: 'A',
        children: [
            {
                name: 'Coupon Form',
                path: '/CouponForm',
                //   iconText: "B",
              //  menuId: '1',
            },
            {
                name: 'Coupon Table List',
                path: '/CouponTableList',
                //  iconText: "E",
             //   menuId: '2',
            },
        ],
    },
//Reports Page
{
    name: 'Reports',
    icon: 'report',
  //  subMenu: '1',
   // menuUid: 'A',
    children: [
        {
            name: 'Subscription Report',
            path: 'Reports/SubscriptReport',
            //   iconText: "B",
          //  menuId: '1',
        }
        // {
        //     name: 'Coupon Table List',
        //     path: '/CouponTableList',
        //     //  iconText: "E",
        //  //   menuId: '2',
        // },
    ],
},

    //moderator
    {
        name: 'Moderator',
        path: '/mod/post',
        icon: 'description',
        subMenu: '0',
        menuId: '6',
        menuUid: 'C',
    },
    {
        name: 'Post Datas',
        path: '/Upload',
        icon: 'file_upload',
    },
    {
        name: 'Notification Messages',
        path: '/MessageTypes',
        icon: 'attach_email',
    },
    // {
    //     label: 'PAGES',
    //     type: 'label',
    // },
    // {
    //     name: 'Session/Auth',
    //     icon: 'security',
    //     children: [
    //         {
    //             name: 'Sign in',
    //             iconText: 'SI',
    //             path: '/session/signin',
    //         },
    //         {
    //             name: 'Sign up',
    //             iconText: 'SU',
    //             path: '/session/signup',
    //         },
    //         {
    //             name: 'Forgot Password',
    //             iconText: 'FP',
    //             path: '/session/forgot-password',
    //         },
    //         {
    //             name: 'Error',
    //             iconText: '404',
    //             path: '/session/404',
    //         },
    //     ],
    // },
    // {
    //     label: 'Components',
    //     type: 'label',
    // },
    // {
    //     name: 'Components',
    //     icon: 'favorite',
    //     badge: { value: '30+', color: 'secondary' },
    //     children: [
    //         {
    //             name: 'Auto Complete',
    //             path: '/material/autocomplete',
    //             iconText: 'A',
    //         },
    //         {
    //             name: 'Buttons',
    //             path: '/material/buttons',
    //             iconText: 'B',
    //         },
    //         {
    //             name: 'Checkbox',
    //             path: '/material/checkbox',
    //             iconText: 'C',
    //         },
    //         {
    //             name: 'Dialog',
    //             path: '/material/dialog',
    //             iconText: 'D',
    //         },
    //         {
    //             name: 'Expansion Panel',
    //             path: '/material/expansion-panel',
    //             iconText: 'E',
    //         },
    //         {
    //             name: 'Form',
    //             path: '/material/form',
    //             iconText: 'F',
    //         },
    //         {
    //             name: 'Icons',
    //             path: '/material/icons',
    //             iconText: 'I',
    //         },
    //         {
    //             name: 'Menu',
    //             path: '/material/menu',
    //             iconText: 'M',
    //         },
    //         {
    //             name: 'Progress',
    //             path: '/material/progress',
    //             iconText: 'P',
    //         },
    //         {
    //             name: 'Radio',
    //             path: '/material/radio',
    //             iconText: 'R',
    //         },
    //         {
    //             name: 'Switch',
    //             path: '/material/switch',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Slider',
    //             path: '/material/slider',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Snackbar',
    //             path: '/material/snackbar',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Table',
    //             path: '/material/table',
    //             iconText: 'T',
    //         },
    //     ],
    // },
    // {
    //     name: 'Charts',
    //     icon: 'trending_up',

    //     children: [
    //         {
    //             name: 'Echarts',
    //             path: '/charts/echarts',
    //             iconText: 'E',
    //         },
    //     ],
    // },
    // {
    //     name: 'Documentation',
    //     icon: 'launch',
    //     type: 'extLink',
    //     path: 'http://demos.ui-lib.com/matx-react-doc/',
    // },
]

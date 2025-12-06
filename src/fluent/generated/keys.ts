import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '3c30f7ec473f45bca2cb37ec2d544e02'
                    }
                    'incident-manager-page': {
                        table: 'sys_ui_page'
                        id: '330941116d8046b0a610f73149d6ac49'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '6bbd703a0800477eb5286248e48b350a'
                    }
                    src_server_index_ts: {
                        table: 'sys_module'
                        id: '3eb240ed323b4fcfa9f2a247d3f88675'
                    }
                    'x_1860385_ticketda/main': {
                        table: 'sys_ux_lib_asset'
                        id: 'b2b837ec95714a7bb420f6d7ef0b990f'
                    }
                    'x_1860385_ticketda/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: 'a615b7cca8fc4445851c69899aacaafa'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '08e984d32edc46d5aaaa26aa11519355'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'short_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0fb8f4548f8c4534b68ae97235f585fc'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '214f36a26a0242f3b87cbea71e308637'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '242c1a2cb3ef451ba496165ec11cd3af'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'priority'
                            value: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '243a5adfb7dc4dc38f5f018c12a6d653'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '2944e3e4d040425eb643de0ef46a6185'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3999164c848e40d098cc7e32d0e56532'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'priority'
                            value: '1'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '3e13957e47254e1f8f04b645ee023eb4'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '406c82ab923c45e9a4c01ee6bfe8f86c'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                            value: 'resolved'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5113c17e814348d3b3c2a8f3ee276763'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '5a5b0754b1244715bf54958e82c04bfe'
                        key: {
                            category: 'x_1860385_ticketda_incident'
                            prefix: 'INC'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5d3dc236cabb495cb5071f96f10a5404'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'resolved_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '604cc2ff59dc4d02baa149e92aff6386'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '718a50b720364e659965e3c3e5c7ec81'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                            value: 'new'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7c51512af4754270bd10fa43cf14f120'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                            value: 'on_hold'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8620aada90244f2d87ff1ae4c98ca4ae'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '980c2b2ea52a46a68d47df94cda9464b'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'resolved_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a196ff6bc7434b91976b5a4eea7f84d5'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'opened_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a1fe055e586d414db392e4e70c36d9d8'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'opened_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a53662b7e73548f3bac49169dacc3481'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'ac4040fc15eb419c8396f3dc4f198e77'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c1b64ee056ca4132908a6a8f745d6bfd'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cccdb0e790274064a9c3b16bc550a2b6'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd7bb8f6c6d8c4109a2e87af82d176316'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                            value: 'in_progress'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'da1f033bd9a341dd8e1361f23663ba05'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'short_description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'da67ccaf9aea49748204c7127f6677a1'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'priority'
                            value: '3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dac3148b869e4ea3a2ce8f4028fa7a24'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                            value: 'closed'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'e22ddc6d0318496c820c2ddf3f560e15'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e59d2907f387426c9944eff2959672a1'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'priority'
                            value: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e5f9ce64666b4fbdbe5b2027c0a269a0'
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'priority'
                        }
                    },
                ]
            }
        }
    }
}

export const CONFIG={
    config: {
        modelInfo:{
            path:'https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/model.json?sign=e7b49c7c36be389b2709893aff13d498&t=1649336951',
            mean: [
                0.485,
                0.456,
                0.406
            ],
            std: [
                0.229,
                0.224,
                0.225
            ],
            list:[
                '0',//Lung_aca结肠腺癌
                '1',//colon_n结肠良性组织
                '2',//lung_aca肺腺癌
                '3',//lung_n肺良性组织
                '4'//lung_scc肺鳞状细胞癌
            ],
            itemMap:{
                0:{
                    name:'结肠腺癌'
                },
                1:{
                    name:'结肠良性组织'
                },
                2:{
                    name:'肺腺癌'
                },
                3:{
                    name:'肺良性组织'
                },
                4:{
                    name:'肺鳞状细胞癌'
                }
            }

        }
    }
}
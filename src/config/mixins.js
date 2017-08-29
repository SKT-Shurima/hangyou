import {hex_md5} from './md5'
const  mixins = {
    methods:{
        hex_md5(val){
            return hex_md5(val);
        },
        checkPhone(phone){
            if (phone === '') {
                this.$vux.alert.show({
                    title: '',
                    content: '请输入手机号'
                })
                return false ;
            } else {
                let reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/g ;
                if (!reg.test(phone)) {
                    this.$vux.alert.show({
                        title: '',
                        content: '请输入正确手机号'
                    });
                    return false ;
                }
            }
            return true;
        },
        checkVal(val,msg){
            if (val==="") {
                this.$vux.alert.show({
                    title: '',
                    content: `请输入${msg}`
                });
                return false;
            }
            return true;
        },
        getHashReq(){
            let reqParams = {};
            let req = location.hash.split("?")[1];
            req = req.split('&')
            for(let i = 0 ;i<req.length;i++){
                let reqUnit = req[i].split('=');
                let key = reqUnit[0];
                let val = reqUnit[1];
                reqParams[key] = val;
            }
            return reqParams ;
        },
        errcode(errcode,message){
            let _this=  this ;
            if (errcode===-101) {
                _this.$vux.alert.show({
                    title: '',
                    content: message,
                    onHide () {
                        _this.$router.replace('./login');
                    }
                });
            }else{
                _this.$vux.alert.show({
                    title: '',
                    content: message
                });
            }
        },
        setCookie(c_name,value,expTime){  
    		var exdate = new Date();  
    		exdate.setTime(exdate.getTime() + expTime *3600 * 1000);  
   		 	document.cookie= c_name + "=" + escape(value)+((expTime==null) ? "" : ";expires="+exdate.toGMTString());  
		},
		getCookie(c_name){  
    		if (document.cookie.length>0){  
        		var c_start=document.cookie.indexOf(c_name + "=");  
       	 		if (c_start!=-1){   
        			c_start=c_start + c_name.length+1;  
       				 var c_end=document.cookie.indexOf(";",c_start);  
       				 if (c_end==-1)   
          				c_end = document.cookie.length  
           				return unescape(document.cookie.substring(c_start, c_end))  
       			}  
    		}  
    		return ""     
		},
		delCookie(c_name){  
    		var exp = new Date();  
    		exp.setTime(exp.getTime() - 1);  
    		var cval = getCookie(c_name);  
    		if(cval!=null){  
        		document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();  
   			}
		}
    }
};
export default mixins ;
<template>
	
</template>
<script type="text/javascript">
	export default{
		created(){
			let query =  this.getHashReq();
			location.href = `http://${query.website}`;
		}
	}
</script>

document.addEventListener("DOMContentLoaded",function(){
	let btn = this.getElementById("upload");

	if (btn) {
		btn.addEventListener("click",function(){
			let cl = this.classList,
				r = "upload-btn--running",
				d = "upload-btn--done",
				dur = 2000;

			if (!cl.contains(r) && !cl.contains(d) && !this.disabled) {
				cl.add(r);
				this.disabled = true;
				this.innerHTML = "Uploading…";

				setTimeout(() => {
					cl.remove(r);
					cl.add(d);
					this.innerHTML = "Not found!";

					setTimeout(() => {
						cl.remove(d);
						this.disabled = false;
						this.innerHTML = "Search";
					},700);
				},dur);
			}
		});
	}
});
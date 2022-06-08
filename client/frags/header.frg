<header>
    <div class="header_wrap">
        <h2 class="unselectable clickable" onclick="hook_clicked('HOOK_CLICKED_GOHOME')">코디</h2>
        <div class="menubox">
            <button class="unselectable clickable showonlylogged">내 프로필</button>
            <button class="unselectable clickable" onclick="hook_clicked('HOOK_CLICKED_BOARD')">커뮤니티</button>
            <button class="unselectable clickable">로드맵</button>
            <button class="unselectable clickable">가이드</button>
            <div class="unselectable clickable usermenu" onclick="hook_clicked('HOOK_CLICKED_USERMENU')">
                <div>
                    <button onclick="hook_clicked('HOOK_CLICKED_SIGNIN')">로그인</button>
                    <button onclick="hook_clicked('HOOK_CLICKED_SIGNUP')">회원가입</button>
                </div>
            </div>
        </div>
    </div>
</header>
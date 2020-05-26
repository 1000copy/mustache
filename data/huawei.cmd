User name:$root
User password:$admin
Warning$
MA5680T$enable
MA5680T$config
<%=prompt%>$dba-profile add profile-id <%=profileid%> type4 max 10240  priority 1 weight 1
<%=prompt%>$ont-lineprofile gpon profile-id <%=profileid%> profile-name profile<%=profileid%>
<%=prompt%>$tcont 1 dba-profile-id <%=profileid%>
<%=prompt%>$gem add 0 eth tcont 1
cascade$ENTER
<%=prompt%>$gem mapping 0 1 vlan 100
transparent$ENTER
<%=prompt%>$commit
<%=prompt%>$quit
<%=prompt%>$ont-srvprofile gpon profile-id <%=profileid%>
profile$ENTER
<%=prompt%>$ont-port pots adaptive eth adaptive
catv$ENTER
<%=prompt%>$commit
<%=prompt%>$quit
<%bandwidths.forEach(function(item){ -%>
<%=prompt%>$traffic table ip name  <%=item.value%>M  cir <%=item.value*1024%> cbs 1023 pir <%=item.value*1024+500%>  pbs 2000 color-mode color-blind color-policy dei priority 0 priority-policy tag-In-package
<%}) -%>
MA5680T$quit
MA5680T$quit
log out?$y
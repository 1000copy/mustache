<%=prompt%>dba-profile add profile-id 101 type4 max <%=zkn%>
<%=prompt%>ont-lineprofile gpon profile-id 101
<%=prompt%>tcont 1 dba-profile-id 101
<%=prompt%>gem add 0 eth tcont 1
<%=prompt%>gem mapping 0 1 vlan 100
<%=prompt%>commit
<%=prompt%>quit
<%=prompt%>ont-srvprofile gpon profile-id 101
<%=prompt%>ont-port pots adaptive eth adaptive
<%=prompt%>commit
<%=prompt%>quit
<%bandwidths.forEach(function(item){ -%>
<%=prompt%>traffic table ip name  <%=item.value%>M  cir <%=item.value*1024%> cbs 1023 pir <%=item.value*1024+500%>  pbs 2000 color-mode color-blind color-policy dei priority 0 priority-policy tag-In-package
<%}) -%>
<%if(version==1){-%>
<%=prompt%>quit
<%}%>
package com.vbs.control.DTOServices;

import com.vbs.dto.ClientDTO;
import com.vbs.dto.ProjectDTO;
import com.vbs.entity.Client;
import com.vbs.entity.Project;

public class MapDTOService {

    public ClientDTO clientToModel(Client client){
        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setId(client.getId());
        clientDTO.setAddress(client.getAddress());
        clientDTO.setCompanyName(client.getCompanyName());
        clientDTO.setEmail(client.getEmail());
        clientDTO.setWebsite(client.getWebsite());
        clientDTO.setPhoneNumber(client.getPhoneNumber());
        return clientDTO;
    }

    public ProjectDTO projectToModel(Project project){
        ProjectDTO projectDTO = new ProjectDTO();
        projectDTO.setId(project.getId());
        projectDTO.setStatus(project.getStatus());
        projectDTO.setProjectNumber(project.getProjectNumber());
        projectDTO.setProjectName(project.getProjectName());
        projectDTO.setTotalDue(project.getTotalDue());
        projectDTO.setRemainingPayment(project.getRemainingPayment());
//        projectDTO.setClient();
//        projectDTO.setInvoices();
//        projectDTO.setServices();
        return projectDTO;
    }


}
